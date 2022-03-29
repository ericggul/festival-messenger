import { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [pos, setPos] = useState({});
  const [permittedStatus, setPermittedStatus] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
          setPermittedStatus(true);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return { pos, permittedStatus };
}
