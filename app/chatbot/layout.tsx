// app/chatbot/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat - Web Agency",
  description: "Chat with our AI assistant",
};

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
