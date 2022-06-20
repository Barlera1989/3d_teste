import React from "react";

const Tower = () => {
  const Base = () => {
    return (
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[0.02, 0.01, 0.02]} />
        <meshPhysicalMaterial color="gray" />
      </mesh>
    );
  };

  const Pole = () => {
    return (
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxBufferGeometry args={[0.005, 0.1, 0.002]} />
        <meshPhysicalMaterial color="gray" />
      </mesh>
    );
  };

  const HorizontalPolePole = () => {
    return (
      <mesh position={[0.0, 0.1, 0.0]} castShadow receiveShadow>
        <boxBufferGeometry args={[0.04, 0.002, 0.002]} />
        <meshPhysicalMaterial color="gray" />
      </mesh>
    );
  };

  const ElectricalConnector = () => {
    return (
      <>
        <mesh position={[0.02, 0.102, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.0005, 0.0005, 0.005, 16]} />
          <meshPhysicalMaterial color="gray" />
        </mesh>
        <mesh position={[0, 0.102, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.0005, 0.0005, 0.005, 16]} />
          <meshPhysicalMaterial color="gray" />
        </mesh>
        <mesh position={[-0.02, 0.102, 0]} castShadow receiveShadow>
          <cylinderBufferGeometry args={[0.0005, 0.0005, 0.005, 16]} />
          <meshPhysicalMaterial color="gray" />
        </mesh>
      </>
    );
  };

  return (
    <>
      <Base />
      <Pole />
      <HorizontalPolePole />
      <ElectricalConnector />
    </>
  );
};

export default Tower;
