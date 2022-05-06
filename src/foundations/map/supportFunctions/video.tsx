const COORDINATES = [
  [360 - 233.0251662, 37.4600416],
  [360 - 233.0380374, 37.4424334],
  [360 - 233.0472199, 37.4471384],
  [360 - 233.0345621, 37.4640778],
];

export default async function video(mapRef: any) {
  try {
    setTimeout(async () => {
      await mapRef.current.addSource("video", {
        type: "video",
        urls: ["./assets/video/video.mp4"],
        coordinates: COORDINATES,
      });
      await mapRef.current.addLayer({
        id: "video",
        type: "raster",
        source: "video",
        minzoom: 6,
        maxzoom: 22,
      });
    }, 3000);
  } catch (e) {
    console.log(e);
  }
}
