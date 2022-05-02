// @ts-ignore
import mapboxgl from "!mapbox-gl"; /* eslint import/no-webpack-loader-syntax: off */

//Three
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

async function generateSNUFestival(INITIAL_POS: any, mapRef: any) {
  //   const modelOrigin = [37.45787, 126.95658];

  //nst INITIAL_POS = { lat: 37.45843, lng: 126.95597 };
  const modelOrigin = [126.95635, 37.45578];
  const modelAltitude = 390;
  const modelRotate = [Math.PI * 0.5, Math.PI * 0.27, Math.PI * 0.01];
  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);

  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  let camera: any;
  let scene: any;
  let mapEl: any;
  let renderer: any;

  try {
    await mapRef.current.addLayer({
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: (map: any, gl: any) => {
        camera = new THREE.Camera();
        scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 0, 1).normalize();
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 0, -1).normalize();
        scene.add(directionalLight2);

        const loader = new FontLoader();
        loader.load("/assets/fonts/Roboto_Regular.json", function (font: any) {
          const textGeo = new TextGeometry("SNU FESTIVAL", {
            font: font,
            size: 15,
            height: 2,
            curveSegments: 12,
          });

          const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
          const textMesh = new THREE.Mesh(textGeo, textMaterial);
          textMesh.position.x = -0.5;
          textMesh.position.y = 0.5;
          textMesh.position.z = 0;
          textMesh.rotation.x = 0;
          textMesh.rotation.y = Math.PI;
          scene.add(textMesh);
        });

        mapEl = map;
        renderer = new THREE.WebGLRenderer({
          canvas: mapEl.getCanvas(),
          context: gl,
          antialias: true,
        });
        renderer.autoClear = false;
      },
      render: (gl: any, matrix: any) => {
        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
        const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
          .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        camera.projectionMatrix = m.multiply(l);
        renderer.resetState();
        renderer.render(scene, camera);
        mapEl.triggerRepaint();
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export default generateSNUFestival;
