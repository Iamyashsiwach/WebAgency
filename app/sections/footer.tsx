"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import StyledLink from "@/components/ui/StyledLink/StyledLink";

export function WorldMapDemo() {
  return (
    <div className="relative py-40 dark:bg-black bg-white w-full h-screen flex flex-col justify-between">
      {/* Main content */}
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>

      {/* World Map */}
      <div className="flex-grow w-full flex justify-center items-center">
        <WorldMap
          dots={[
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: 40.7128, lng: -74.0060 } }, // New York
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: 51.5074, lng: -0.1278 } }, // London
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: -33.8688, lng: 151.2093 } }, // Sydney
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: 35.6895, lng: 139.6917 } }, // Tokyo
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: -33.9249, lng: 18.4241 } }, // Cape Town
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: -22.9068, lng: -43.1729 } }, // Rio de Janeiro
            { start: { lat: 12.4, lng: 77.0266 }, end: { lat: 25.276987, lng: 55.296249 } }, // Dubai
          ]}
        />
      </div>

      {/* Footer Section - Lowered the position */}
      <div className="absolute text-sm text-neutral-500 bottom-[5%] md:bottom-10 left-[65%] md:left-[65%] transform -translate-x-1/2 md:translate-x-0">
  <p className="mb-1">Copyright © {new Date().getFullYear()} All rights reserved</p>
  <p>
    Made with ❤️ by{" "}
    <StyledLink aria-label="Yash Siwach - Portfolio" external href="https://yashsiwach.space">
      Yash Siwach
    </StyledLink>
  </p>
</div>
    </div>
  );
}