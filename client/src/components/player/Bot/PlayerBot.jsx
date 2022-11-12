import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./PlayerBot.css";
import Mewaving from "./Mewaving.js";
import { OrbitControls } from "@react-three/drei";
import { BooleanKeyframeTrack } from "three";

const PlayerBot = (props) => {
  return (
    <div className="RightSide">
      <section className='BOTsection' >
          <h1>Bot Feedback</h1>
        </section>
      <div className="bot-container-video">
        <Canvas className="bot-canvas">
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
      <div className="bot-text">{props.botText || 'Hi, my name is Pekanu. Welcome to E-Tutor'}</div>
    </div>
  );
};

export default PlayerBot;
