import { NextResponse } from 'next/server';
import { createRAGChain } from '@/ai/rag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const chain = await createRAGChain();
    const response = await chain.generateAnswer(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat-rag route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 