import React from "react";
import * as THREE from "three";

const Cables = (props) => {
  const { lat, lng, midLat, midLng, nextLat, nextLng, cablePosition } = props;

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(lat, 0.104, lng),
    new THREE.Vector3(midLat, 0.08, midLng),
    new THREE.Vector3(nextLat, 0.104, nextLng),
  ]);

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0x444444 });

  // Create the final object to add to the scene
  const meshtest = new THREE.Line(geometry, material);

  return <primitive object={meshtest} position={[cablePosition, 0, 0]} />;
};

export default Cables;
