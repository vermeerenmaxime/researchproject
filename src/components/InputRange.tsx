import { useEffect, useRef, useState } from "react";

export const InputRange = (valueArray: any, setValue: any, props: any) => {
  console.log(valueArray, props);
  const value1Ref: any = useRef(null);

  const [valueA, setValueA] = useState(0);

  useEffect(() => {
    // value1Ref.current.value = valueArray[0];
    console.log(valueArray,setValue);
    // setValue(valueArray[0],5);
  });
  useEffect(() => {
    // value1Ref.current.value = valueArray[0];
    console.log(valueA);

    // props.setKickFreq;
    // const setfunction = props.setKickFreq;
  }, [valueA]);

  return (
    <>
      <input
        ref={value1Ref}
        className="bg-white/10 outline-none px-2 py-1 rounded-sm"
        type="number"
        placeholder="Start.."
        value={valueA}
        // onChange={() => onTest([valueA, valueB])}
        onChange={(e) => {
          setValueA(parseInt(e.target.value));
          // console.log(valueA,e.target.value);
        }}
      ></input>
      <input
        className="bg-white/10 outline-none px-2 py-1 rounded-sm"
        type="number"
        // value={valueB}
        placeholder="End.."
        // onChange={() => onTest([valueA, valueB])}
        onChange={(e) => {
          // setValueB(parseInt(e.target.value));
          // console.log(valueA,e.target.value);
        }}
      ></input>
    </>
  );
};
