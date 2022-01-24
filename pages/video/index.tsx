import { useRouter } from "next/router";
import { PageContent } from "../../src/components/PageContent";

const VideoIndex = () => {
  return (
    <PageContent>
      <h1 className="text-xl font-semibold ">Choose video</h1>
      <hr className="opacity-10 m-0"></hr>
      {[1, 2, 3, 4].map((key, i) => {
        return (
          <a key={i} href={`video/${key}`}>
            {key}
          </a>
        );
      })}
    </PageContent>
  );
};

export default VideoIndex;
