"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

// Define interfaces directly in the file to avoid TypeScript errors
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
}

export function useVoiceCall() {
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [transcriptionOnly, setTranscriptionOnly] = useState(false);
  
  const callFrame = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Speech recognition setup
  const recognitionRef = useRef<any>(null);
  
  // Timeout ref for connection handling
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    console.log('[VOICE-CALL] Initializing speech recognition...');
    
    if (typeof window === 'undefined') {
      console.warn('[VOICE-CALL] Cannot initialize speech recognition: window is undefined');
      return false;
    }
    
    // Check browser support for various speech recognition APIs
    const hasWebkitSpeechRecognition = 'webkitSpeechRecognition' in window;
    const hasSpeechRecognition = 'SpeechRecognition' in window;
    
    console.log('[VOICE-CALL] Browser support:', {
      webkitSpeechRecognition: hasWebkitSpeechRecognition,
      SpeechRecognition: hasSpeechRecognition
    });
    
    // Make sure transcript starts with something so the user sees it's working
    setTranscript('Listening... (Speak now)');
    
    if (!hasWebkitSpeechRecognition && !hasSpeechRecognition) {
      console.warn('[VOICE-CALL] Speech recognition not supported in this browser');
      
      // Show transcript message anyway so user knows we're trying
      setTranscript('Speech recognition not supported in this browser. Voice call will work but without transcription.');
      return false;
    }
    
    try {
      // Try both standard and webkit versions
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                   (window as any).webkitSpeechRecognition;
      
      console.log('[VOICE-CALL] Creating speech recognition instance...');
      recognitionRef.current = new SpeechRecognitionAPI();
      
      // Configure recognition
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Set language explicitly
      
      // Set up handlers with proper error handling
      recognitionRef.current.onstart = () => {
        console.log('[VOICE-CALL] Speech recognition started event');
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          console.log('[VOICE-CALL] Speech recognized:', transcriptText);
          setTranscript(prev => prev + ' ' + transcriptText);
        } catch (err) {
          console.error('[VOICE-CALL] Error processing speech result:', err);
        }
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('[VOICE-CALL] Speech recognition error:', event.error, event);
        
        // Don't treat no-speech as an error
        if (event.error === 'no-speech') {
          console.log('[VOICE-CALL] No speech detected, this is normal');
          return;
        }
        
        setTranscript(prev => prev + ' [Error: ' + event.error + ']');
      };
      
      recognitionRef.current.onend = () => {
        console.log('[VOICE-CALL] Speech recognition ended event');
        
        // Auto restart if we're still in an active call
        if (callStatus === 'connected' && !isMuted) {
          console.log('[VOICE-CALL] Automatically restarting speech recognition');
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error('[VOICE-CALL] Error restarting speech recognition:', err);
          }
        }
      };
      
      console.log('[VOICE-CALL] Speech recognition initialized successfully');
      return true;
    } catch (err) {
      console.error('[VOICE-CALL] Failed to initialize speech recognition:', err);
      return false;
    }
  }, [callStatus, isMuted]);
  
  // Start transcription
  const startTranscription = useCallback(() => {
    console.log('[VOICE-CALL] Starting speech recognition...');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        console.log('[VOICE-CALL] Speech recognition started with existing instance');
        return true;
      } catch (err) {
        console.error('[VOICE-CALL] Failed to start existing speech recognition:', err);
        
        // If it fails because it's already running, that's ok
        if (err instanceof DOMException && err.name === 'InvalidStateError') {
          console.log('[VOICE-CALL] Recognition was already running');
          return true;
        }
        
        // Otherwise try to reinitialize
        recognitionRef.current = null;
      }
    }
    
    const initialized = initSpeechRecognition();
    console.log('[VOICE-CALL] Speech recognition initialized:', initialized);
    
    if (initialized && recognitionRef.current) {
      try {
        recognitionRef.current.start();
        console.log('[VOICE-CALL] Speech recognition started after initialization');
        return true;
      } catch (err) {
        console.error('[VOICE-CALL] Failed to start speech recognition after init:', err);
        return false;
      }
    }
    
    return false;
  }, [initSpeechRecognition]);
  
  // Stop transcription
  const stopTranscription = useCallback(() => {
    console.log('[VOICE-CALL] Stopping speech recognition...');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        console.log('[VOICE-CALL] Speech recognition stopped');
        return true;
      } catch (err) {
        console.error('[VOICE-CALL] Failed to stop speech recognition:', err);
        
        // If it fails because it's not running, that's ok
        if (err instanceof DOMException && err.name === 'InvalidStateError') {
          console.log('[VOICE-CALL] Recognition was not running');
          return true;
        }
        
        return false;
      }
    }
    
    console.log('[VOICE-CALL] No speech recognition instance to stop');
    return true;
  }, []);

  // Start the call
  const startVoiceCall = async () => {
    setError(null);
    setIsVoiceCallActive(true);
    setTranscript('');
    
    try {
      setCallStatus('connecting');
      console.log('[VOICE-CALL] Starting voice call...');
      
      // Start speech recognition immediately
      const recognitionStarted = startTranscription();
      console.log('[VOICE-CALL] Speech recognition started:', recognitionStarted);
      
      // If speech recognition started successfully, we can potentially
      // operate in transcription-only mode if needed
      if (recognitionStarted) {
        console.log('[VOICE-CALL] Speech recognition is working, attempting call connection...');
      } else {
        setError('Speech recognition not available in this browser. Try Chrome or Edge.');
      }
      
      try {
        // Call our API to get a room URL
        console.log('[VOICE-CALL] Fetching room URL from API...');
        const response = await fetch('/api/voice-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: 'Web Visitor', 
            email: 'visitor@example.com'  // In a real app, collect user info first
          }),
        });
        
        console.log('[VOICE-CALL] API response status:', response.status);
        const data = await response.json();
        console.log('[VOICE-CALL] API response data:', data);
        
        if (!response.ok) {
          throw new Error(data.message || 'Could not start voice call');
        }
        
        // Use the room URL from the API response
        const url = data.roomUrl;
        if (!url) {
          throw new Error('No room URL provided by the API');
        }
        console.log('[VOICE-CALL] Using room URL:', url);
        setRoomUrl(url);
      
        // Create and join the call
        if (containerRef.current) {
          // Set a timeout to fall back to transcription mode in case the call
          // connection takes too long
          connectionTimeoutRef.current = setTimeout(() => {
            if (callStatus === 'connecting') {
              console.warn('[VOICE-CALL] Connection timeout - falling back to transcription only mode');
              setCallStatus('connected');
              setTranscriptionOnly(true);
              setError('Voice call connection timed out. Using speech recognition only.');
              
              // Clear the Daily.co iframe since it's not working
              if (containerRef.current) {
                containerRef.current.innerHTML = '';
              }
            }
          }, 8000);
          
          console.log('[VOICE-CALL] Creating Daily.co call frame...');
          try {
            callFrame.current = DailyIframe.createFrame(containerRef.current, {
              iframeStyle: {
                width: '100%',
                height: '100%',
                border: '0',
                borderRadius: '8px',
                backgroundColor: '#f1f5f9',
              },
              showLeaveButton: true,
              showFullscreenButton: true,
              showLocalVideo: false,      // Hide local video since this is voice-only
              // Only using default buttons for simplicity
            });
            
            // Set up event handlers
            callFrame.current
              .on('joining-meeting', () => {
                console.log('[VOICE-CALL] Joining meeting...');
              })
              .on('joined-meeting', () => {
                console.log('[VOICE-CALL] Successfully joined meeting');
                setCallStatus('connected');
                
                // Clear the timeout since we successfully connected
                if (connectionTimeoutRef.current) {
                  clearTimeout(connectionTimeoutRef.current);
                  connectionTimeoutRef.current = null;
                }
              })
              .on('error', (e: any) => {
                console.error('[VOICE-CALL] Daily error:', e);
                setError(`Call error: ${e.errorMsg}`);
                // Don't disconnect if there's an error, just fall back to transcription
                setTranscriptionOnly(true);
                setCallStatus('connected');
              })
              .on('left-meeting', () => {
                console.log('[VOICE-CALL] Left meeting');
                setCallStatus('disconnected');
                setIsVoiceCallActive(false);
                stopTranscription();
              });
            
            // Join the call (audio only for "voice" call)
            console.log('[VOICE-CALL] Attempting to join call:', url);
            // Set configuration explicitly for a voice-only call
            await callFrame.current.join({
              url,
              showLeaveButton: true,
              userName: 'Web Visitor',
              startVideoOff: true,      // Audio only for voice calls
              startAudioOff: false,     // Ensure audio is on
              audioSource: true,        // Use default audio source
              videoSource: false,       // No video
              dailyConfig: {
                experimentalChromeVideoMuteLightOff: true,
                camSimulcastEncodings: false, // Turn off simulcast for simpler connection
                receiverTransform: 'manual'   // Don't force specific transform 
              }
            }).catch((joinError: Error) => {
              console.error('[VOICE-CALL] Error joining call:', joinError);
              
              // If joining fails, don't throw - just use transcription mode
              console.log('[VOICE-CALL] Falling back to transcription-only mode');
              setTranscriptionOnly(true);
              setCallStatus('connected');
              setError('Using speech recognition only. ' + joinError.message);
              
              // Clear the Daily.co iframe
              if (containerRef.current) {
                containerRef.current.innerHTML = '';
              }
              
              // Make sure the timeout is cleared
              if (connectionTimeoutRef.current) {
                clearTimeout(connectionTimeoutRef.current);
                connectionTimeoutRef.current = null;
              }
            });
            console.log('[VOICE-CALL] Join call initiated successfully');
          } catch (callFrameError) {
            console.error('[VOICE-CALL] Error creating or joining call:', callFrameError);
            // Fall back to transcription mode even if call fails
            setTranscriptionOnly(true);
            setCallStatus('connected');
            setError('Using speech recognition only due to call error.');
          }
        } else {
          console.error('[VOICE-CALL] containerRef is not available');
          // If container isn't available, still use transcription
          setTranscriptionOnly(true);
          setCallStatus('connected');
        }
      } catch (apiError: any) {
        console.error('[VOICE-CALL] API error:', apiError);
        // Even if API fails, we can still use transcription
        setTranscriptionOnly(true);
        setCallStatus('connected');
        setError('Using speech recognition only. Could not connect to voice service.');
      }
    } catch (err: any) {
      console.error('[VOICE-CALL] Error starting call:', err);
      setError(err.message || 'Failed to start call');
      setCallStatus('disconnected');
      setIsVoiceCallActive(false);
      stopTranscription();
    }
  };

  // End call
  const endVoiceCall = useCallback(() => {
    if (callFrame.current) {
      callFrame.current.leave();
      callFrame.current = null;
    }
    setCallStatus('disconnected');
    setIsVoiceCallActive(false);
    stopTranscription();
  }, [stopTranscription]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (callFrame.current) {
      if (isMuted) {
        callFrame.current.setLocalAudio(true);
        // Restart transcription when unmuting
        startTranscription();
      } else {
        callFrame.current.setLocalAudio(false);
        // Pause transcription when muting
        stopTranscription();
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted, startTranscription, stopTranscription]);

  // Listen for transcription-only mode event
  useEffect(() => {
    const handleTranscriptionOnly = () => {
      console.log('[VOICE-CALL] Switching to transcription-only mode');
      setCallStatus('connected');
      setTranscriptionOnly(true);
      setError('Using speech recognition only mode.');
      
      // Make sure speech recognition is working
      startTranscription();
      
      // Clean up any callFrame
      if (callFrame.current) {
        callFrame.current.destroy();
        callFrame.current = null;
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('transcription-only', handleTranscriptionOnly);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('transcription-only', handleTranscriptionOnly);
      }
      
      if (callFrame.current) {
        callFrame.current.destroy();
      }
      stopTranscription();
      
      // Clear any pending timeouts
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    };
  }, [startTranscription, stopTranscription]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isVoiceCallActive,
    startVoiceCall,
    endVoiceCall,
    isMuted,
    toggleMute,
    containerRef,
    callStatus,
    error,
    transcript,
    clearTranscript,
    transcriptionOnly
  };
} 