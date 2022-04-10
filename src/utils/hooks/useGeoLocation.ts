import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import { actions } from "@R/geoLocation/state";

export default function useGeoLocation() {
  const dispatch = useAppDispatch();
  const geoLocation = useAppSelector((state) => state.geoLocation);

  const [pos, setPos] = useState({});
  const [permittedStatus, setPermittedStatus] = useState(false);

  useEffect(() => {
    if (!permittedStatus) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
            setPermittedStatus(true);
            // dispatch(actions.setValues({ pos: { lat: position.coords.latitude, lng: position.coords.longitude }, permittedStatus: true }));
          },
          (error) => {
            alert("메시지 열람을 위해서는 위치 권한이 필요합니다.");
            console.log(error);
          }
        );
      } else {
        alert("브라우저가 GeoLocation을 지원하지 않습니다. 최신 브라우저(크롬, 사파리 등)을 이용하시길 바랍니다.");
      }
    }
  }, [pos, permittedStatus]);

  return { pos, permittedStatus };
}
