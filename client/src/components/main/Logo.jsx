import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

const LogoModel = (props) => {
  const { nodes } = useGLTF("/logo.glb");
  const groupRef = useRef();

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh geometry={nodes.Text.geometry}>
        <meshStandardMaterial color="#a7a7ff" metalness={2} roughness={0.2} />
      </mesh>
    </group>
  );
};

const NavbarLogo = () => {
  return (
    <div className="w-40 h-20">
      <Canvas camera={{ position: [10, 30, 40], fov: 0.9 }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 30, 40]} color="blue" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <LogoModel scale={0.4} position={[0.2, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default NavbarLogo;
