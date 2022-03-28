export default function geoLocation() {
  if (!navigator.geolocation) {
    return null;
  }
  console.log("here");
  let pos;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      pos = { lat: position.coords.latitude, lng: position.coords.longitude };
    },
    (error) => {
      console.log(error);
    }
  );
  console.log(pos);
  return pos;
}
