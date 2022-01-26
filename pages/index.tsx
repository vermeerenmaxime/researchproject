import type { NextPage } from "next";
import Head from "next/head";
import { Suspense, useEffect, useRef } from "react";

import shallow from "zustand/shallow";
import { useStore } from "../src/stores/store";

const PageContent = ({ children }: any) => {
  return (
    <section className="bg-slate-900/95 text-white ">
      <div className="p-8 grid gap-8 max-w-[900px]">{children}</div>
    </section>
  );
};
const Home: NextPage = () => {
  // const likes = useStore((state) => state.likes);
  // const addLike = useStore((state) => state.increaseLike);
  // const removeLikes = useStore((state) => state.removeAllLikes);

  const [likes, addLike, removeLikes] = useStore(
    (state) => [state.likes, state.increaseLike, state.removeAllLikes],
    shallow
  );

  useEffect(() => {
    console.log(likes);
  }, [likes]);
  // const likes = useStore();
  return (
    <>
      <Head>
        <title>3D Audio Visualizer</title>
        <meta name="description" content="3D Audio Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContent>
        <h1 className="text-xl font-semibold ">3D Web Player</h1>
        <hr className="opacity-10 m-0"></hr>
        <div>
          <h2 className="text-md font-semibold ">What is it? Wat is het?</h2>
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
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold ">Why is it usefull?</h2>
          <div className="opacity-70 font-base">
            YouTube channels and promoters
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold ">What comes next?</h2>
          <div className="opacity-70 font-base"></div>
        </div>
      </PageContent>
    </>
  );
};

export default Home;
