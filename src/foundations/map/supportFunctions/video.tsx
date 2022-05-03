// const COORDINATES = [
//   [126.95695, 37.45977],
//   [126.95663, 37.45942],
//   [126.95649, 37.45967],
//   [126.95671, 37.46002],
// ];

// const COORDINATES = [
//   [360 - 233.0327654, 37.4589],
//   [360 - 233.039267, 37.444377],
//   [360 - 233.0467558, 37.4468568],
//   [360 - 233.03918, 37.46084],
// ];

const COORDINATES = [
  [360 - 233.0251662, 37.4600416],
  [360 - 233.0380374, 37.4424334],
  [360 - 233.0472199, 37.4471384],
  [360 - 233.0345621, 37.4640778],
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
