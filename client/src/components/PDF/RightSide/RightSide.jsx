import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Kick from "./Kick.js";
import "./RightSide.css";
import Mewaving from "./Mewaving.js";
import { OrbitControls } from "@react-three/drei";
import { BooleanKeyframeTrack } from "three";

const RightSide = () => {
  return (
    <div className="RightSidePDF">
        <div>
        <Canvas style={{ height: 800 }}>
          <OrbitControls />
          <directionalLight intensity={0.5} />
          <directionalLight intensity={0.6} position={[0, 0, 1]} />
          <ambientLight intensity={0.2} position={[50, 0, 0]} />
          <Suspense fallback={null}>
            <group position={[0, -0.5, 0]}>
              <Mewaving />
            </group>
          </Suspense>
        </Canvas>
        </div>
    </div>
  );
};

export default RightSide;
