import { useState } from "react";

export const EditBox = ({ title, children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="box self-start">
      <b
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center "
      >
        {title}
        <div
          className={`cursor-pointer hover:bg-black/25 p-1 flex rounded-full items-center justify-center opacity-50 hover:opacity-100 transition-all hover:rotate-90 ${
            open ? "rotate-90" : ""
          }`}
        >
          <svg
            className="-mr-px"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </b>

      {open ? (
        <>
          <hr className="opacity-20"></hr>
          {children}
        </>
      ) : null}
    </div>
  );
};
