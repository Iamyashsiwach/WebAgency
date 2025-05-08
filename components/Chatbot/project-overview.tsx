import NextLink from "next/link";
import { Phone } from "lucide-react";

export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end pt-12 pb-8">
      <h1 className="text-3xl font-semibold mb-4 text-black dark:text-white">Let&apos;s Chat,</h1>
      <p className="text-center text-black dark:text-white mb-4">We&apos;re Live!</p>
      
      <div className="max-w-lg mx-auto p-6 bg-gray-50 dark:bg-gray-800/40 rounded-lg shadow-sm mt-8">
        <h2 className="text-xl font-medium mb-3 flex items-center gap-2">
          <Phone size={18} className="text-green-600" />
          <span>Voice Chat Available</span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Need to speak with us directly? Click the voice call button in the top right corner to start a voice conversation with our AI assistant.
        </p>
      </div>
    </div>
  );
};

const Link = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <NextLink
      target="_blank"
      className="text-blue-500 hover:text-blue-600 transition-colors duration-75"
      href={href}
    >
      {children}
    </NextLink>
  );
};
