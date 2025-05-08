// app/chatbot/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'AI Chat & Voice Assistant | Web Agency',
  description: 'Connect with our AI assistant through text or voice for immediate assistance',
};

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}
