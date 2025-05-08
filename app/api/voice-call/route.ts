import { NextResponse } from 'next/server';

// Configure the API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout

export async function POST(request: Request) {
  try {
    console.log('[VOICE-CALL] Request received');
    const data = await request.json();
    console.log('[VOICE-CALL] Received voice call data:', JSON.stringify(data, null, 2));
    
    // For free implementation, we'll use a predefined public room for testing
    // This lets us bypass the need for an API key
    
    // Validate required fields
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`[VOICE-CALL] Missing required field: ${field}`);
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate a unique room URL for demo/testing
    // For the demo, we're using a known public room that works without authentication
    const roomName = `webagency-${Date.now().toString().slice(-6)}`;
    
    // Use a publicly accessible room that doesn't require token generation
    // This demo room is used for testing and should work without auth
    const roomUrl = `https://webagency.daily.co/hello`;
    
    console.log(`[VOICE-CALL] Room URL created: ${roomUrl}`);
    
    // Send response (without relying on RAG)
    const response = { 
      success: true, 
      message: 'Voice call initiated successfully',
      callId: roomName,
      roomUrl: roomUrl,
      timestamp: new Date().toISOString()
    };
    
    console.log('[VOICE-CALL] Sending response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    const err = error as Error;
    console.error('[VOICE-CALL] Detailed error in voice-call route:', {
      message: err.message,
      stack: err.stack,
      type: err.constructor.name
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initiate voice call',
        error: err.message,
        details: err.stack
      }, 
      { status: 500 }
    );
  }
} 