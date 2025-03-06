import { Globe } from "@/components/magicui/globe";
import StyledLink from "@/components/ui/StyledLink/StyledLink";

export function Footer() {
  return (
    <footer className="relative w-full h-[60vh] bg-background">
      <div className="relative w-full h-[55vh] sm:h-[60vh]  flex flex-col justify-between items-center bg-background">
        {/* "Coming Soon" Text */}
        <span className="mt-8 sm:mt-12 text-4xl sm:text-5xl font-semibold text-transparent bg-gradient-to-b from-white to-gray-500 bg-clip-text dark:from-white dark:to-gray-900">
          Coming Soon
        </span>

        {/* Globe - Reduce gap below it */}
        <div className="relative flex justify-center items-end w-full h-[50vh] sm:h-[60vh]">
          <Globe className="w-[85%] sm:w-[70%] max-w-[450px]" />
        </div>

        {/* Footer - Reduce space */}
        <div className="w-full pb-4 sm:pb-6 text-center text-sm text-back">
          <p>Copyright © {new Date().getFullYear()} All rights reserved</p>
          <p>
            Made with ❤️ by{" "}
            <StyledLink aria-label="Yash Siwach - agency" external href="https://yashsiwach.space">
              Yash Siwach
            </StyledLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
// Keep the GlobeDemo component for backward compatibility or other uses
export function GlobeDemo() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between bg-background">
      <div className="flex flex-col items-center justify-center flex-grow">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Globe
        </span>
        <Globe className="top-28" />
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
      </div>

      <div className="absolute text-sm text-neutral-500 bottom-[5%] md:bottom-10 left-1/2 transform -translate-x-1/2">
        <p className="mb-1">Copyright © {new Date().getFullYear()} All rights reserved</p>
        <p>
          Made with ❤️ by{" "}
          <StyledLink aria-label="Yash Siwach - agency" external href="https://yashsiwach.space">
            Yash Siwach
          </StyledLink>
        </p>
      </div>
    </div>
  );
}