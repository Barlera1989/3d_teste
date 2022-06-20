import "./App.css";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useRef, useMemo, useCallback } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CatmullRomCurve3 } from "three";
import { towerData } from "./towerData.js";
import Tower from "./3dModels/Tower.js";
import Cables from "./3dModels/Cables";

extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

function App() {
  const { static_data } = towerData;
  console.log(static_data);

  const SimpleTL = (props) => {
    const ref = useRef();
    return (
      <mesh {...props}>
        {/* base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxBufferGeometry args={[2, 0.5, 2]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
        {/* mast */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxBufferGeometry args={[0.5, 5, 0.5]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>

        {/* electrical connector */}
        <mesh position={[0, 5.0, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.02, 0.02, 0.2, 16]} />
          <meshPhysicalMaterial color="blue" />
        </mesh>
      </mesh>
    );
  };

  const renderTowers = () => {
    const towers = [];
    const connectors = [];

    for (let i = 0; i < static_data.n_tower; i++) {
      const lat = (static_data.latitude[i] - static_data.latitude[0]) * 1000;
      const lng = (static_data.longitude[i] - static_data.longitude[0]) * 1000;
      towers.push(
        <mesh key={i} position={[lat, 0, lng]}>
          <Tower />
        </mesh>
      );

      if (i !== static_data.n_tower - 1) {
        const nextLat =
          (static_data.latitude[i + 1] - static_data.latitude[0]) * 1000;
        const nextLng =
          (static_data.longitude[i + 1] - static_data.longitude[0]) * 1000;

        const midLat = (nextLat + lat) / 2;
        const midLng = (nextLng + lng) / 2;

        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(lat, 5.1, lng),
          new THREE.Vector3(midLat, 4.5, midLng),
          new THREE.Vector3(nextLat, 5.1, nextLng),
        ]);

        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final object to add to the scene
        const meshtest = new THREE.Line(geometry, material);

        connectors.push(<primitive object={meshtest} position={[0, 0, 0]} />);
      }
    }
    console.log(towers);
    return towers;
  };

  const renderCables = () => {
    const connectors = [];

    for (let i = 0; i < static_data.n_tower - 1; i++) {
      const lat = (static_data.latitude[i] - static_data.latitude[0]) * 1000;
      const lng = (static_data.longitude[i] - static_data.longitude[0]) * 1000;

      const nextLat =
        (static_data.latitude[i + 1] - static_data.latitude[0]) * 1000;
      const nextLng =
        (static_data.longitude[i + 1] - static_data.longitude[0]) * 1000;

      const midLat = (nextLat + lat) / 2;
      const midLng = (nextLng + lng) / 2;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(lat, 0.51, lng),
        new THREE.Vector3(midLat, 0.4, midLng),
        new THREE.Vector3(nextLat, 0.51, nextLng),
      ]);

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

      // Create the final object to add to the scene
      const meshtest = new THREE.Line(geometry, material);

      connectors.push(
        <Cables
          lat={lat}
          lng={lng}
          midLat={midLat}
          midLng={midLng}
          nextLat={nextLat}
          nextLng={nextLng}
        />
      );
    }
    return connectors;
  };

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 5.1, 0),
    new THREE.Vector3(0, 4.5, 10),
    new THREE.Vector3(0, 5.1, 20),
  ]);

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the final object to add to the scene
  const meshtest = new THREE.Line(geometry, material);

  const TestFunc = () => {
    return <primitive object={meshtest} position={[0, 0, 0]} />;
  };

  const MeshCurve = (props) => {
    return (
      <mesh>
        <CatmullRomCurve3
          args={[
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
          ]}
        />
        <meshPhysicalMaterial color="blue" />
      </mesh>
    );
  };

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
    /*   const { dist } = props;
    const side1 = dist[0] - dist[1];
    const side2 = dist[3] - dist[2];

    const length = (side1 ** 2 + side2 ** 2) ** (1 / 2);
    console.log(side1);
    console.log(side2);
    console.log(length);

    const angle = side1 / length;
    console.log(angle); */

    useFrame((state) => {
      ref.current.rotation.x = Math.PI / 2;
      //ref.current.rotation.z = Math.PI * angle;
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
        camera={{ position: [-10, 40, -40] }}
        shadowMap
      >
        {renderTowers()}
        {renderCables()}
        {/* <SimpleTL position={[0, 0, 0]} />
        <TestFunc /> */}
        {/*  <HighTransmissionLine position={[0, 0, 0]} /> */}
        {/* <FourLines position={[0, 0, 0]} dist={[0, 0, 0, 20]} /> */}

        {/* <HighTransmissionLine position={[0, 0, 20]} /> */}
        {/* <FourLines position={[0, 0, 20]} dist={[0, 10, 20, 50]} /> */}

        {/* <HighTransmissionLine position={[10, 0, 50]} /> */}
        {/* <FourLines position={[10, 0, 50]} dist={[10, 0, 0, 80]} /> */}

        {/* <HighTransmissionLine position={[0, 0, 80]} /> */}
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
