"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SimpleVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if (typeof window === 'undefined') return false;
    
    // Check browser support
    const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    console.log("[VOICE] Browser supports speech recognition:", hasSpeechRecognition);
    
    if (!hasSpeechRecognition) {
      setError("Speech recognition not supported in this browser. Try Chrome or Edge.");
      return false;
    }
    
    try {
      // Use the appropriate API
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                  (window as any).webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      // Setup event handlers
      recognitionRef.current.onstart = () => {
        console.log("[VOICE] Recognition started");
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log("[VOICE] Transcript:", transcriptText);
        setTranscript(prev => prev + ' ' + transcriptText);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("[VOICE] Recognition error:", event.error);
        if (event.error !== 'no-speech') {
          setError(`Error: ${event.error}. Try restarting or using Chrome.`);
        }
      };
      
      recognitionRef.current.onend = () => {
        console.log("[VOICE] Recognition ended");
        // Auto restart if we're still supposed to be listening
        if (isListening) {
          try {
            recognitionRef.current.start();
            console.log("[VOICE] Restarted recognition after end");
          } catch (e) {
            console.error("[VOICE] Failed to restart recognition:", e);
          }
        } else {
          setIsListening(false);
        }
      };
      
      return true;
    } catch (e) {
      console.error("[VOICE] Error initializing speech recognition:", e);
      setError("Failed to initialize speech recognition. Try reloading the page.");
      return false;
    }
  };
  
  // Start listening
  const startListening = () => {
    setError("");
    setTranscript("");
    
    // Initialize if needed
    if (!recognitionRef.current) {
      if (!initSpeechRecognition()) {
        return; // Failed to initialize
      }
    }
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
      console.log("[VOICE] Started listening");
    } catch (e) {
      console.error("[VOICE] Error starting recognition:", e);
      
      // If it failed because it's already running, that's ok
      if (e instanceof DOMException && e.name === 'InvalidStateError') {
        console.log("[VOICE] Recognition was already running");
        setIsListening(true);
        return;
      }
      
      setError("Failed to start speech recognition. Try again.");
    }
  };
  
  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        console.log("[VOICE] Stopped listening");
      } catch (e) {
        console.error("[VOICE] Error stopping recognition:", e);
      }
    }
    
    setIsListening(false);
  };
  
  // Clear transcript
  const clearTranscript = () => {
    setTranscript("");
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("[VOICE] Error stopping recognition on unmount:", e);
        }
      }
    };
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="my-6">
        <h1 className="text-3xl font-bold mb-4">Simple Voice Recognition</h1>
        <p className="mb-6">Speak naturally and your voice will be transcribed. No external services required.</p>
        
        {!isListening ? (
          <button 
            onClick={startListening}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Mic size={18} />
            Start Voice Recognition
          </button>
        ) : (
          <div className="bg-white dark:bg-black/20 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center mb-4">
              <div className="flex items-center justify-center gap-2">
                <div className="relative">
                  <Mic size={24} className="text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <span className="font-medium">Listening...</span>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center mb-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            {/* Transcript */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare size={16} className="text-green-600" />
                  Your Voice Transcript:
                </p>
                <button 
                  onClick={clearTranscript} 
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm min-h-[100px] whitespace-pre-wrap">{transcript || "Start speaking..."}</p>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button 
                onClick={stopListening}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <MicOff size={16} />
                Stop Listening
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
} 