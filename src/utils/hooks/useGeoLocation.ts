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
          alert("메시지 열람을 위해서는 위치 권한이 필요합니다.");
          console.log(error);
        }
      );
    }
  }, []);

  return { pos, permittedStatus };
}
