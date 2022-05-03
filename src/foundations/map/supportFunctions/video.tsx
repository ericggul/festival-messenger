// const COORDINATES = [
//   [126.95695, 37.45977],
//   [126.95663, 37.45942],
//   [126.95649, 37.45967],
//   [126.95671, 37.46002],
// ];

const COORDINATES = [
  [126.95695, 37.45977],
  [126.95663, 37.45942],
  [126.95649, 37.45967],
  [126.95671, 37.46002],
];

export default async function video(mapRef: any) {
  try {
    await mapRef.current.addSource("video", {
      type: "video",
      urls: ["./assets/video/video.mp4"],
      coordinates: COORDINATES,
    });
    await mapRef.current.addLayer({
      id: "video",
      type: "raster",
      source: "video",
    });
  } catch (e) {
    console.log(e);
  }
}
