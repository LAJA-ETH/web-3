import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading({
  type = 'pulse'
}) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      {
        type === 'pulse' 
        ? 
        <PulseLoader color={color} loading={loading} cssOverride={override} />
        :
        <BounceLoader color={color} loading={loading} cssOverride={override} />
      }
    </div>
  );
}

export default Loading;
