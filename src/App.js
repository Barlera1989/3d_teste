import "./App.css";
import { Canvas, extend, useThree } from "react-three-fiber";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

  const renderTowers = () => {
    const towers = [];

    for (let i = 0; i < static_data.n_tower; i++) {
      const lat = (static_data.latitude[i] - static_data.latitude[0]) * 1000;
      const lng = (static_data.longitude[i] - static_data.longitude[0]) * 1000;
      towers.push(
        <mesh key={i} position={[lat, 0, lng]}>
          <Tower />
        </mesh>
      );
    }
    return towers;
  };

  const renderCables = () => {
    const connectors = [];

    const cablesOffset = [0.02, 0, -0.02];

    cablesOffset.forEach((cablePosition) => {
      for (let i = 0; i < static_data.n_tower - 1; i++) {
        const lat = (static_data.latitude[i] - static_data.latitude[0]) * 1000;
        const lng =
          (static_data.longitude[i] - static_data.longitude[0]) * 1000;

        const nextLat =
          (static_data.latitude[i + 1] - static_data.latitude[0]) * 1000;
        const nextLng =
          (static_data.longitude[i + 1] - static_data.longitude[0]) * 1000;

        const midLat = (nextLat + lat) / 2;
        const midLng = (nextLng + lng) / 2;

        connectors.push(
          <Cables
            lat={lat}
            lng={lng}
            midLat={midLat}
            midLng={midLng}
            nextLat={nextLat}
            nextLng={nextLng}
            cablePosition={cablePosition}
          />
        );
      }
    });
    return connectors;
  };

  const Floor = (props) => {
    return (
      <mesh {...props} receiveShadow>
        <boxBufferGeometry args={[1000, 0.5, 1000]} />
        <meshPhysicalMaterial color="#567d46" />
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
    <div className="App">
      <Canvas
        style={{ background: "black" }}
        camera={{ position: [-0.1, 0.4, 0.4] }}
        shadowMap
      >
        {renderTowers()}
        {renderCables()}

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
