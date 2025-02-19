"use client";
import React, { Fragment } from "react";
import dynamic from 'next/dynamic';
import GridBackgroudLayout from "@/components/wrapper/GridBackgroudLayout/GridBackgroudLayout";
import MainComponent from "@/components/wrapper/MainComponent/MainComponent";
import ErrorBoundary from "@/components/wrapper/ErrorBoundary/ErrorBoundary";
import WebGLWrapper from "@/components/wrapper/WebGLWrapper/WebGLWrapper";
import { CoverDemo } from "@/app/sections/intro";
// import ScrollDown from "@/components/ui/ScrollDown/ScrollDown";
import withThemeRerender from "@/components/hoc/withThemeRerender";
// import { SCROLL_DOWN_LOAD_DELAY } from "@/utils/timing";
import {Showcase} from "@/app/sections/cards"
import  HeroParallaxDemo  from "@/app/sections/Hero";
import {WorldMapDemo} from "@/app/sections/footer";
import { Analytics } from "@vercel/analytics/react"

// Only render the DisplacementSphere component on the client side
const DisplacementSphere = dynamic(() => import("@/components/ui/DisplacementSphere/DisplacementSphere"), {
  ssr: false,
});

const ThemeAwareDisplacementSphere = withThemeRerender(DisplacementSphere);

const Home = () => (
  <Fragment>
    <ErrorBoundary>
      <WebGLWrapper>
        <ThemeAwareDisplacementSphere themeAware />
      </WebGLWrapper>
    </ErrorBoundary>
    <GridBackgroudLayout>
      <MainComponent>
        <div className="relative flex justify-end items-center h-screen">
          <CoverDemo />
        </div>
        {/* <ScrollDown mountDelay={SCROLL_DOWN_LOAD_DELAY} href="#about" /> */}
       <HeroParallaxDemo />
       <Showcase />
      <WorldMapDemo/>
      </MainComponent>
      </GridBackgroudLayout>
<Analytics/>
  </Fragment>
);

export default Home;
