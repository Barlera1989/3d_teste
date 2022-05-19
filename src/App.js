import "./App.css";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useRef, useMemo, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

function App() {
  /*  const Box = (props) => {
    const ref = useRef();
    useFrame((state) => {
      //ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    });
    return (
      <mesh ref={ref} {...props} castShadow receiveShadow>
        <boxBufferGeometry />
        <meshPhysicalMaterial
          color="blue"
          metalness={1}
          opacity={0.5}
          transparent
          fog={false}
        />
      </mesh>
    );
  }; */

  const HighTransmissionLine = (props) => {
    const ref = useRef();
    return (
      <mesh {...props}>
        {/* base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxBufferGeometry args={[5, 0.5, 1]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
        {/* mast */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxBufferGeometry args={[0.5, 5, 0.5]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>

        {/* horizontal pole */}

        <mesh position={[0, 4.9, 0]} castShadow receiveShadow>
          <boxBufferGeometry args={[2.5, 0.1, 0.1]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>

        {/* electrical connector */}
        <mesh position={[1.2, 5.0, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
        <mesh position={[0.6, 5.0, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
        <mesh position={[-0.6, 5.0, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
        <mesh position={[-1.2, 5.0, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
      </mesh>
    );
  };

  const FourLines = (props) => {
    const ref = useRef();
    const { dist } = props;
    const side1 = dist[0] - dist[1];
    const side2 = dist[3] - dist[2];

    const length = (side1 ** 2 + side2 ** 2) ** (1 / 2);
    console.log(side1);
    console.log(side2);
    console.log(length);

    const angle = side1 / length;
    console.log(angle);

    useFrame((state) => {
      ref.current.rotation.x = Math.PI / 2;
      ref.current.rotation.z = Math.PI * angle;
    });

    return (
      <mesh ref={ref} {...props}>
        <mesh position={[-1.2, 10.0, -5.1]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.01, 0.01, 20, 16]} />
          <meshPhysicalMaterial color="red" />
        </mesh>
        <mesh position={[0.6, 10.0, -5.1]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.01, 0.01, 20, 16]} />
          <meshPhysicalMaterial color="red" />
        </mesh>
        <mesh position={[-0.6, 10.0, -5.1]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.01, 0.01, 20, 16]} />
          <meshPhysicalMaterial color="red" />
        </mesh>
        <mesh position={[1.2, 10.0, -5.1]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.01, 0.01, 20, 16]} />
          <meshPhysicalMaterial color="red" />
        </mesh>
      </mesh>
    );
  };

  const TransmissionLine = (props) => {
    return (
      <mesh {...props} castShadow receiveShadow>
        <cylinderBufferGeometry args={[0, 5, 10, 0]} />
        <meshPhysicalMaterial color="blue" />
      </mesh>
    );
  };

  const Floor = (props) => {
    return (
      <mesh {...props} receiveShadow>
        <boxBufferGeometry args={[1000, 0.5, 1000]} />
        <meshPhysicalMaterial />
      </mesh>
    );
  };

  const Bulb = (props) => {
    return (
      <mesh {...props}>
        <pointLight castShadow />
        <sphereBufferGeometry args={[0.1, 20, 20]} />
        <meshPhongMaterial emissive="yellow" />
      </mesh>
    );
  };

  return (
    <div style={{ height: "100vh", width: "100 vw" }}>
      <Canvas
        style={{ background: "black" }}
        camera={{ position: [-10, 10, -10] }}
        shadowMap
      >
        {/*   <fog attach="fog" args={["white", 1, 10]} /> */}
        {/* <Box position={[0, 1, 0]} /> */}
        <HighTransmissionLine position={[0, 0, 0]} />
        <FourLines position={[0, 0, 0]} dist={[0, 0, 0, 20]} />

        <HighTransmissionLine position={[0, 0, 20]} />
        <FourLines position={[0, 0, 20]} dist={[0, 10, 20, 50]} />

        <HighTransmissionLine position={[10, 0, 50]} />
        {/*  <FourLines position={[10, 0, 50]} dist={[10, 0, 0, 80]} /> */}

        <HighTransmissionLine position={[0, 0, 80]} />
        {/*      <TransmissionLine position={[0, 5, 0]} />
        <TransmissionLine position={[20, 5, 10]} />
        <TransmissionLine position={[40, 5, 40]} /> */}

        {/* <mesh>
          <meshBasicMaterial side={THREE.DoubleSide} />
          <geometry>
            <face3 args={[0, 1, 2]} attachArray="faces" />
            <vector3 attachArray="vertices" />
            <vector3 args={[0, 1, 1]} attachArray="vertices" />
            <vector3 args={[0, 1, -1]} attachArray="vertices" />
          </geometry>
        </mesh> */}

        <Bulb position={[200, 200, 200]} />

        <ambientLight intensity={0.2} />

        <Orbit />
        <axesHelper args={[5]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
