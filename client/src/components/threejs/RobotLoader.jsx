import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import ProgressBar from "./ProgressBar";
import { BackgroundBeamsWithCollision } from "../ui/BackgroundBeams";

function Model(props) {
  const group = useRef();
  const { scene, animations } = useGLTF(`tech-log/robot.glb`);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const walkAction = actions["walk"];
    if (walkAction) {
      walkAction.timeScale = 1;
      walkAction.play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} {...props} />;
}

export default function RobotLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 2000;
    let startTime;

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (elapsedTime < totalDuration) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  return (
    <BackgroundBeamsWithCollision className={"h-screen w-screen"}>
      <div className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full">
        <div className="w-full h-3/5">
          <Canvas camera={{ position: [-10, 1, 5], fov: 25 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <Suspense fallback={null}>
              <Model scale={1.5} position={[0, -1, 0]} />
            </Suspense>
          </Canvas>
        </div>

        <div className="flex w-full justify-center p-5">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
