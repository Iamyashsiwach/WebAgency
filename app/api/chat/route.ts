import { NextResponse } from 'next/server';

// Configure the API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Simple responses for demo since Pinecone is over quota
const demoResponses: Record<string, string> = {
  "default": "I'm a simple AI assistant. Since the Pinecone database is currently at quota limits, I'm providing basic responses. What can I help you with regarding web development or design?",
  "hello": "Hello! How can I help you with your web project today?",
  "hi": "Hi there! I'm here to assist with your web development needs.",
  "help": "I can help with web design, development, marketing, and digital strategy. What specific area are you interested in?",
  "services": "Our web agency offers website development, UI/UX design, SEO optimization, content marketing, and digital strategy consulting.",
  "pricing": "Our pricing varies based on project requirements. Basic websites start at $1,000, while more complex projects with custom features range from $5,000 to $15,000+.",
  "contact": "You can reach our team at contact@webagency.com or schedule a call through the Schedule page.",
  "portfolio": "Our portfolio includes work for clients in e-commerce, SaaS, education, healthcare, and non-profit sectors. Check our Projects page for examples.",
  "technologies": "We specialize in React, Next.js, TypeScript, Node.js, TailwindCSS, and various headless CMS solutions.",
  "timeline": "Project timelines vary based on complexity. Simple websites can be completed in 2-4 weeks, while complex applications may take 2-3 months.",
};

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
    const { message } = await request.json();
    console.log('[CHAT] Received message:', message);
    
    // Search for keywords in the message to provide relevant responses
    const messageLower = message.toLowerCase();
    let response = demoResponses.default;
    
    // Simple keyword matching for demo purposes
    for (const [keyword, reply] of Object.entries(demoResponses)) {
      if (keyword !== 'default' && messageLower.includes(keyword)) {
        response = reply;
        break;
      }
    }
    
    // For specific questions about the voice feature
    if (messageLower.includes('voice') || messageLower.includes('speech') || messageLower.includes('talk')) {
      response = "You can try our voice recognition feature by going to the Voice Recognition page. It allows you to speak naturally and see your voice transcribed in real-time.";
    }
    
    // Add some delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('[CHAT] Sending response:', response);
    return NextResponse.json({ response });
    
  } catch (error) {
    console.error('[CHAT] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}