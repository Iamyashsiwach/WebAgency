import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { gotham } from "@/utils/fonts";
import { longDescription } from "@/utils/config";
import { ReadOnlyChildren } from "@/utils/types";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://goonline.site"),

  title: {
    template: "%s | Agency",
    default: "Agency - Web Development, SEO & Digital Solutions",
  },
  authors: {
    name: "Yash Siwach",
  },
  description:
    "Your trusted partner in web development, UI/UX design, SEO, and digital marketing.",
  openGraph: {
    title: "Yash Siwach | Agency",
    description: longDescription,
    url: "https:/yashsiwach.space",
    siteName: "Yash Siwach | Agency",
    images: "https://goonline.site/icon.png",
    type: "website",
  },
  twitter: {
    title: "Yash Siwach | Agency",
    description: longDescription,
    images: "https://goonline.site/icon.png",
  },
  keywords: [
    "Yash Siwaxh",
    "Web Development",
    "UI/UX Design",
    "E-commerce Solutions",
    "SEO",
    "Content Marketing",
    "PPC Advertising",
    "Social Media Marketing",
    "Branding",
    "Custom Web Apps",
    "Digital Solutions",
  ],
  manifest: "https://goonline.site/manifest.json",
  icons: [
    {
      url: "https://goonline.site/icon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "https://goonline.site/icon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "https://goonline.site/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "https://goonline.site/icon-1024x1024.png",
      sizes: "1024x1024",
      type: "image/png",
    },
    {
      url: "https://goonline.site/icon.png",
      sizes: "234x203",
      type: "image/png",
    },
    {
      url: "https://goonline.site/maskable_icon.png",
      sizes: "1024x1024",
      type: "image/png",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0 0% 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(0 0% 7.8%)" },
  ],
};

export default function RootLayout({ children }: ReadOnlyChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          gotham.className,
          gotham.variable,
          "antialiased",
          "overflow-x-hidden",
        )}
      >
        <ThemeProvider>
          <NextUIProvider>
            <ClientLayout>{children}</ClientLayout>
          </NextUIProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
