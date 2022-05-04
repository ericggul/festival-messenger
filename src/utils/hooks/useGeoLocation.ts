import { useEffect, useState } from "react";

export default function useGeoLocation(check: any) {
  const [pos, setPos] = useState<any>({});
  const [permittedStatus, setPermittedStatus] = useState(false);

  useEffect(() => {
    if (check) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
            setPermittedStatus(true);
          },
          (error) => {
            setPermittedStatus(false);
            alert("메시지 열람을 위해서는 위치 권한이 필요합니다.");
            alert(`${error.code}, ${error.message}`);

            console.log(error, error.message);
            return;
          }
        );
      } else {
        setPermittedStatus(false);
        alert("브라우저가 GeoLocation을 지원하지 않습니다. 최신 브라우저(크롬, 사파리 등)을 이용하시길 바랍니다.");
      }
    }
  }, [check]);

  return { pos, permittedStatus };
}
