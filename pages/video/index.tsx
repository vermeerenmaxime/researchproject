import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageContent } from "../../src/components/PageContent";

interface videoData {}

const VideoIndex = () => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(require("../../public/VideoData.json"));
    // console.log(data);
  }, []);

  return (
    <PageContent>
      <h1 className="text-xl font-semibold ">Choose video</h1>
      <hr className="opacity-10 m-0"></hr>
      <div className="grid grid-cols-3 gap-4">
        {data &&
          Object.keys(data).map((key, i) => {
            console.log(data[key]);
            const video: any = data[key];
            return (
              <div
                className="box gap-8 relative "
                // style={{ backgroundImage: `url(${video.image})` }}
                key={i}
              >
                {/* <img
                  className="inset-0 absolute z-0 opacity-20"
                  src={video.image}
                  alt={key}
                ></img> */}
                <div>{video.canvas.audio.audioName}</div>
                <div
                  onClick={() => router.push(`video/${key}`)}
                  className=" hover:opacity-80 cursor-pointer transition-opacity self-start uppercase text-[.625rem] font-bold py-1 px-2 bg-blue-500 rounded-sm grid gap-2 grid-flow-col items-center"
                >
                  <p>Watch now</p>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="tv"
                    className="w-3 h-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"
                    ></path>
                  </svg>
                </div>
              </div>
            );
          })}
      </div>
    </PageContent>
  );
};

export default VideoIndex;
