import { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [pos, setPos] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return pos;
}
