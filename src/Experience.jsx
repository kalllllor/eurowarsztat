import { Suspense } from "react";
import Chair from "./components/chair/Chair";
import Curtain from "./components/curtain/Curtain";

export default function Experience() {
  return (
    <>
      <Curtain
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      {/* <Suspense fallback={null}>
        <Chair />
      </Suspense> */}
    </>
  );
}
