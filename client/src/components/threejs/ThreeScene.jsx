import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";

const Laptop = (props) => {
  const { scene } = useGLTF("laptop.glb");
  return <primitive object={scene} {...props} />;
};

const LogoText = (props) => {
  const { scene } = useGLTF("logo.glb");
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t / 2) / 20;
    ref.current.position.y = Math.sin(t / 1) / 3 + props.position[1];
  });

  return <primitive ref={ref} object={scene} {...props} />;
};

const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [-25, 5, 5], fov: 20 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      <Suspense fallback={null}>
        <LogoText scale={1} position={[0, 3, -2]} rotation={[0, 0, 0]} />

        <PresentationControls global={false} speed={1.5} polar={[0, 0]}>
          <Laptop scale={25} position={[0, -2.5, 0]} rotation={[0, 1, 0]} />
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;
