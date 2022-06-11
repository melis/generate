import React, { useEffect, useRef } from "react";
import { ReactComponent as ReactLogo } from "../map/1.svg";
import "./Test.css";
function Test() {
  const ref = useRef();

  useEffect(() => {
    console.dir(ref.current.childNodes[15]);
  }, [ref]);
  return (
    <div>
      <ReactLogo ref={ref} className="svg" />
    </div>
  );
}

export default Test;
