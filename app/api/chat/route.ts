import { createRAGChain } from '@/ai/rag';
import { NextResponse } from 'next/server';

// Configure the API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  try {
    console.log("Received chat request");
    const body = await request.json();
    const message = body?.message || '';
    
    console.log("Received message:", message);
    
    if (!message || typeof message !== 'string') {
      console.log("Invalid message received");
      return NextResponse.json(
        { error: 'Please provide a valid message', response: 'Error: Invalid message' },
        { status: 400 }
      );
    }
    
    console.log("Initializing RAG chain...");
    const ragChain = await createRAGChain();
    console.log("RAG chain initialized successfully");
    
    // Use the generateAnswer method to get a response based on the RAG implementation
    console.log("Generating answer for message:", message);
    const answer = await ragChain.generateAnswer(message);
    console.log("Generated answer:", answer);
    
    // Ensure we return a non-empty response
    if (!answer || answer.trim() === '') {
      console.log("Empty answer received, returning fallback response");
      return NextResponse.json({ 
        response: "I couldn't find information about that. Please try asking something else." 
      });
    }
    
    console.log("Sending response:", answer);
    return NextResponse.json({ 
      response: answer 
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    // Return more detailed error message for debugging
    return NextResponse.json(
      { 
        error: 'Failed to process message',
        message: error instanceof Error ? error.message : 'Unknown error',
        response: "Sorry, I encountered an error while processing your request." 
      },
      { status: 500 }
    );
  }
}