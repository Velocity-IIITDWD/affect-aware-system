import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Kick from "../RightSide/Kick.js";

const VideoBot = () => {
  return (
    <Canvas style={{ height: 900 }}>
      <directionalLight intensity={0.5} />
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <Kick />
      </Suspense>
    </Canvas>
  );
};

export default VideoBot;
