"use client"

import React from "react";
import {
  Navbar as NextUINavbar, NavbarBrand, Button, Link,
  NavbarContent, NavbarItem
} from "@nextui-org/react";
import Logo from "@/components/ui/Logo/Logo";
import ThemeSwitch from "@/components/ui/ThemeSwitch/ThemeSwitch";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { NAVBAR_LOAD_DELAY, NAVBAR_LOAD_DURATION } from "@/utils/timing";

const navbarVaraints: Variants = {
  initial: { opacity: 0, filter: "blur(20px)" },
  blurIn: { opacity: 1, filter: "blur(0px)", transition: { duration: NAVBAR_LOAD_DURATION, delay: NAVBAR_LOAD_DELAY, ease: 'easeInOut' } }
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
          <Button
            as={Link}
            color="primary"
            href="mailto:iamyashsiwach@gmail.com"
            aria-label="Contact Me"
            variant="solid"
            radius="sm"
          >
            Contact
          </Button>
        </NavbarItem>
        <NavbarItem>
          {/* Add a mobile menu button here if needed */}
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar >
  </AnimatePresence>
);

export default Navbar;
