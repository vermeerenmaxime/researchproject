import type { NextPage } from "next";
import Head from "next/head";
import { Suspense, useEffect, useRef } from "react";

import shallow from "zustand/shallow";
import { PageContent } from "../src/components/PageContent";
import { useStore } from "../src/stores/store";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>3D Audio Visualizer :: About</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContent>
        <h1 className="text-xl font-semibold ">3D Web Player</h1>
        <hr className="opacity-10 m-0"></hr>
        <div>
          <h2 className="text-md font-semibold ">Made by Maxime Vermeeren</h2>
          <div className="opacity-70 font-base">
            
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default About;
