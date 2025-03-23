import { Metadata } from 'next';
import Chat from '@/components/Chatbot/chat';

export const metadata: Metadata = {
  title: 'AI Chat - Web Agency',
  description: 'Chat with our AI assistant',
};

export default function ChatbotPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Chat with our AI</h1>
        <Chat />
      </div>
    </main>
  );
}
