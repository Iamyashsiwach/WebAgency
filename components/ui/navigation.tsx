"use client";

import Link from "next/link";
import { Mic, MessageSquare, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2 p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
        <Link 
          href="/"
          className={`p-3 rounded-full flex items-center justify-center ${
            isActive('/') ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <MessageSquare size={20} />
        </Link>
        
        <Link 
          href="/voice-call"
          className={`p-3 rounded-full flex items-center justify-center ${
            isActive('/voice-call') ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Mic size={20} />
        </Link>
        
        <Link 
          href="/Schedule"
          className={`p-3 rounded-full flex items-center justify-center ${
            isActive('/Schedule') ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Calendar size={20} />
        </Link>
      </div>
    </div>
  );
} 