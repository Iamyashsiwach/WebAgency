"use client";
import React, { Fragment } from "react";
import GridBackgroudLayout from "@/components/wrapper/GridBackgroudLayout/GridBackgroudLayout";
import MainComponent from "@/components/wrapper/MainComponent/MainComponent";
import { CoverDemo } from "@/app/sections/intro";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Home = () => (
  <Fragment>
    <GridBackgroudLayout>
      <MainComponent>
        <div className="relative flex justify-end items-center h-screen">
          <CoverDemo />
        </div>
      </MainComponent>
    </GridBackgroudLayout>
    <Analytics />
    <SpeedInsights />
  </Fragment>
);

export default Home;
