"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import withThemeRerender from "@/components/hoc/withThemeRerender";
import WebGLWrapper from "@/components/wrapper/WebGLWrapper/WebGLWrapper";
import ErrorBoundary from "@/components/wrapper/ErrorBoundary/ErrorBoundary";
import { ReadOnlyChildren } from "@/utils/types";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/QueryProvider";
import UIHelpers from "@/components/ui/UIHelpers/UIHelpers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/app/sections/footer";
import { usePathname } from "next/navigation";

const DisplacementSphere = dynamic(
  () => import("@/components/ui/DisplacementSphere/DisplacementSphere"),
  {
    ssr: false,
  },
);
const ThemeAwareDisplacementSphere = withThemeRerender(DisplacementSphere);

const GlobalCanvas: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 dark:bg-grid-white/[0.03] bg-grid-black/[0.03]">
      <ErrorBoundary>
        <WebGLWrapper>
          <ThemeAwareDisplacementSphere themeAware />
        </WebGLWrapper>
      </ErrorBoundary>
    </div>
  );
};

const ClientLayout: FC<ReadOnlyChildren> = ({ children }) => {
  const pathname = usePathname();
  const isChatbotPage = pathname === "/chatbot";

  return (
    <div className="relative min-h-screen">
      <GlobalCanvas />
      <Header />
      <main>
        <QueryProvider>{children}</QueryProvider>
      </main>
      <UIHelpers />
      <Toaster position="top-right" reverseOrder={false} />
      {!isChatbotPage && <Footer />}
    </div>
  );
};

export default ClientLayout; 