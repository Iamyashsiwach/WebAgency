"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Logo from "@/components/ui/Logo/Logo";
import ThemeSwitch from "@/components/ui/ThemeSwitch/ThemeSwitch";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { NAVBAR_LOAD_DELAY, NAVBAR_LOAD_DURATION } from "@/utils/timing";

const navbarVaraints: Variants = {
  initial: { opacity: 0, filter: "blur(20px)" },
  blurIn: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: NAVBAR_LOAD_DURATION,
      delay: NAVBAR_LOAD_DELAY,
      ease: "easeInOut",
    },
  },
};

const Navbar: React.FC = () => (
  <AnimatePresence>
    <NextUINavbar
      as={motion.nav}
      isBlurred={false}
      maxWidth="full"
      className="opacity-0 bg-transparent fixed transition-colors-400"
      initial="initial"
      animate="blurIn"
      exit="initial"
      variants={navbarVaraints}
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent className="transition-colors-400" justify="end">
        <NavbarItem>
          <Link
            href="/chatbot"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-white backdrop-blur-3xl">
              Need Help?
            </span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <a
            href="https://wa.me/917206099609"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-white backdrop-blur-3xl">
              Chat on WhatsApp
            </span> */}
          </a>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  </AnimatePresence>
);

export default Navbar;
