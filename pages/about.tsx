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
            {/* A web player where a canvas.. */}
            Een HTML5 canvas waar muziek in afgespeeld kan worden. Tijdens het
            afspelen zullen objecten in de canvas bewegen aan de hand van de
            frequencies in de muziek.
            <br></br>
            <br></br>
            Het bereik van de kick, lows, mids en highs kun je zelf instellen.
            De audioanalyser vangt 60x per seconde de frequencies op die in de
            track aanwezig zijn. Dit wordt opgeslaan in een array van 64
            waarden.<br></br> De kick komt voornamelijk voor in bijvoorbeeld in
            het [2,7] van de array.
            <br></br>
            <br></br>Ter uitbreiding zijn er heel wat controls aanwezig om je
            canvas aan te sturen. Je kan het thema, de lichtintensiteit, bloom,
            hue en 2 verschillende pointlights aansturen. Hierdoor dirigeer je
            zogezegd je video.
            <br></br>Deze parameters kan je opslaan naar een JSON file, of een
            json file inladen. <br></br>
            <br></br>Door gebruik te maken van deze JSON is het mogelijk om zo
            de canvas op te slaan en later met diezelfde settings weer te geven.
            Dit gebeurd op de videos pagina. Hier staan enkele voorgemaakte
            scenes die je kan afspelen.
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default About;
