import shallow from "zustand/shallow";
import { useAudioStore } from "../stores/audioStore";
import { useObjectStore } from "../stores/objectStore";
import { formatTime } from "../utils/time";

export const AudioPlayer = () => {
  const [
    audioUrl,
    setAudioUrl,
    audioPlay,
    setAudioPlay,
    setAudioStart,
    audioLength,
    setAudioName,
    audioName,
    audioCurrentTime,
    setAudioCurrentTime,
    addAudioCurrentTime,
  ] = useAudioStore(
    (state: any) => [
      state.audioUrl,
      state.setAudioUrl,
      state.audioPlay,
      state.setAudioPlay,
      state.setAudioStart,
      state.audioLength,
      state.setAudioName,
      state.audioName,
      state.audioCurrentTime,
      state.setAudioCurrentTime,
      state.addAudioCurrentTime,
    ],
    shallow
  );

  return (
    <div className="bg-white/10 rounded-sm text-sm relative ">
      <div className="px-5 py-4 flex justify-between items-center">
        <div className="grid gap-2 grid-flow-col items-center">
          <div className="flex space-x-1 items-center">
            <svg
              className="w-5 h-5 rotate-180	"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
              ></path>
            </svg>
            <svg
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setAudioPlay(!audioPlay);
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {audioPlay ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </>
              )}
            </svg>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
              ></path>
            </svg>
          </div>
          <div className="flex items-center opacity-75">
            {/* Mave & Alex Silves - Memories */}
            {audioName}
          </div>
          {/* <div className="bg-white/20 py-1 px-2 rounded-full text-xs opacity-75">
            {audioLength ? formatTime(audioCurrentTime) : "00:00"}
          </div> */}
        </div>
        <div className="text-xs opacity-50 ">
          {audioLength ? formatTime(audioLength) : "00:00"}
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[1.5px] w-1/3 bg-white/80 m-1"></div>
    </div>
  );
};
