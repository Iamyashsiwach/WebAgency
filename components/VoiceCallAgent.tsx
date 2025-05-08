"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { Phone, PhoneOff, Mic, MicOff, User, Mail } from 'lucide-react';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnected';

export default function VoiceCallAgent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  
  const callFrame = useRef<any>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Start the call
  const startCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!name || !email) {
      setError('Please enter your name and email to continue');
      return;
    }
    
    try {
      setCallStatus('connecting');
      
      // Call our API to get a room URL
      const response = await fetch('/api/voice-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Could not start voice call');
      }
      
      // Add this code before setting the URL
      const roomName = `call-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const domain = process.env.NEXT_PUBLIC_DAILY_DOMAIN || 'your-daily-domain.daily.co';
      const url = data.roomUrl || `https://${domain}/${roomName}`;
      setRoomUrl(url);
      
      // Create and join the call
      if (videoContainerRef.current) {
        callFrame.current = DailyIframe.createFrame(videoContainerRef.current, {
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: '0',
            borderRadius: '8px',
          },
          showLeaveButton: true,
          showFullscreenButton: true,
        });
        
        // Set up event handlers
        callFrame.current
          .on('joined-meeting', () => setCallStatus('connected'))
          .on('error', (e: any) => {
            console.error('Daily error:', e);
            setError(`Call error: ${e.errorMsg}`);
            setCallStatus('disconnected');
          })
          .on('left-meeting', () => setCallStatus('disconnected'));
        
        // Join the call (audio only for "voice" call)
        await callFrame.current.join({
          url,
          showLeaveButton: true,
          userName: name,
          startVideoOff: true, // Audio only for voice calls
        });
      }
    } catch (err: any) {
      console.error('Error starting call:', err);
      setError(err.message || 'Failed to start call');
      setCallStatus('disconnected');
    }
  };

  // End call
  const endCall = useCallback(() => {
    if (callFrame.current) {
      callFrame.current.leave();
      callFrame.current = null;
    }
    setCallStatus('disconnected');
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (callFrame.current) {
      if (isMuted) {
        callFrame.current.setLocalAudio(true);
      } else {
        callFrame.current.setLocalAudio(false);
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (callFrame.current) {
        callFrame.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-black/20 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Voice Call Agent</h2>
      
      {error && (
        <div className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}
      
      {callStatus === 'idle' && (
        <form onSubmit={startCall} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <User size={16} />
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Start Voice Call
          </button>
        </form>
      )}
      
      {callStatus === 'connecting' && (
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <Phone size={36} className="text-blue-500 mb-4" />
            <p className="text-lg font-medium">Connecting your call...</p>
          </div>
        </div>
      )}
      
      {callStatus === 'connected' && (
        <div className="space-y-4">
          <div 
            ref={videoContainerRef} 
            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden" 
            style={{ height: '300px' }}
          />
          
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-800'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-600 text-white"
              title="End Call"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        </div>
      )}
      
      {callStatus === 'disconnected' && (
        <div className="text-center py-8">
          <p className="text-lg mb-6">Call ended</p>
          <button
            onClick={() => setCallStatus('idle')}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
          >
            Start a new call
          </button>
        </div>
      )}
    </div>
  );
} 