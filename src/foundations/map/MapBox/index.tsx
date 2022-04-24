import * as S from "./styles";
import { useEffect, useRef, useState, useCallback } from "react";
import useResize from "@/utils/hooks/useResize";

// @ts-ignore
import mapboxgl from "!mapbox-gl"; /* eslint import/no-webpack-loader-syntax: off */

//css
import "mapbox-gl/dist/mapbox-gl.css";
import "@F/map/MapBox/css/marker.css";
import "@F/map/MapBox/css/currentPosMarker.css";
import "@F/map/MapBox/css/newMessage.css";
import "@F/map/MapBox/css/resetButton.css";

//libraries
import SunCalc from "suncalc";
import pointInPolygon from "point-in-polygon";

//hooks
import useGeoLocation from "@U/hooks/useGeoLocation";

//support function
import createMessageMarker from "@F/map/supportFunctions/createMessageMarker";

//Icons
import AddMessage from "@I/icons/map/add-message.svg";

//configs
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLES } from "@/configs/mapbox";

const POLYGON = [
  [126.9567311, 37.4603392],
  [126.9548643, 37.4583549],
  [126.9555885, 37.4566431],
  [126.9564629, 37.4575501],
  [126.9571817, 37.459577],
  [126.9567311, 37.4603392],
];

function MapBox({
  //modal related
  handleMessageClick,
  handleAddNewMessage,
  messageSendMode,
  //current position related
  goToCurrentPosition,
  goToCurrentPositionCompleted,
  //reset related
  resetState,
  resetCompleted,
  onMapDisplayed,
  //data related
  currentMessages,
  user,
  zoomIn = false,
}: any) {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef<any>(!null);
  const mapContainerRef = useRef<any>(!null);

  const INITIAL_POS = { lat: 37.45843, lng: 126.95597 };
  const [displayMap, setDisplayMap] = useState(false);
  const [pos, setPos] = useState(INITIAL_POS);
  const [zoom, setZoom] = useState(zoomIn ? 12 : 18);

  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    if (mapContainerRef && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [pos.lng, pos.lat],
        zoom: zoom,
        pitch: 85,
        bearing: 180,
        style: MAPBOX_STYLES,
        attributionControl: false,
      });

      return () => {
        mapRef.current.remove();
      };
    }
  }, [mapContainerRef]);

  //go to current position related
  const { pos: currentPos, permittedStatus: currentPosPermittedStatus } = useGeoLocation();

  useEffect(() => {
    if (goToCurrentPosition) {
      console.log("get to current pos");
      mapZoomToCurrent();
      goToCurrentPositionCompleted();
    }
  }, [goToCurrentPosition]);

  //Resize Map
  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.resize();
    }
  }, [mapRef, windowWidth, windowHeight]);

  useEffect(() => {
    if (mapRef.current && typeof mapRef.current == "object") {
      mapRef.current.on("load", () => {
        //Building

        const layers = mapRef.current.getStyle().layers;
        const labelLayerId = layers.find((layer: any) => layer.type === "symbol" && layer.layout["text-field"]).id;

        mapRef.current.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#e7d2f7",
              "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
              "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
              "fill-extrusion-opacity": 1,
            },
          },
          labelLayerId
        );

        //Get Terrain Data
        mapRef.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 22,
        });

        mapRef.current.addSource("mapbox-dem2", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 22,
        });

        // mapRef.current.addLayer({
        //   id: "hillshading",
        //   source: "mapbox-dem",
        //   type: "hillshade",
        // });

        //Terrain
        mapRef.current.setTerrain({ source: "mapbox-dem2", exaggeration: 2 });

        //Fog
        // mapRef.current.setFog({
        //   range: [-1, 1.5],
        //   color: getFog(),
        //   "horizon-blend": 0.1,
        // });

        //Sky

        mapRef.current.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0, 5, 0.3, 8, 1],
            "sky-type": "atmosphere",
            "sky-atmosphere-halo-color": "rgba(230, 215, 250, 0.5)",
            "sky-atmosphere-sun-intensity": 5,
            "sky-atmosphere-sun": getSunPosition(),
          },
        });
      });

      //Error Handling
      mapRef.current.on("error", (e: any) => {
        if (e && e.error !== "Error: Not Found") {
          console.log(e);
        }
      });

      //React Binding
      mapRef.current.on("move", () => {
        setPos({
          lat: mapRef.current.getCenter().lat.toFixed(5),
          lng: mapRef.current.getCenter().lng.toFixed(5),
        });
        setZoom(mapRef.current.getZoom().toFixed(2));
      });
    }

    mapZoomOnceIdle(zoomIn);
    // addMessagesMarker();
  }, [mapRef, zoomIn]);

  //New Marker on message Click
  const [newMarkerLatLng, setNewMarkerLatLng] = useState<any>(null);
  const [newMarker, setNewMarker] = useState<any>(null);

  //Add new marker on click
  useEffect(() => {
    if (messageSendMode) {
      if (mapRef.current && typeof mapRef.current == "object") {
        //Click event
        mapRef.current.on("click", (e: any) => {
          //check if marker in POLYGON
          setNewMarkerLatLng(e.lngLat);
        });
      }
    }
  }, [mapRef, messageSendMode]);

  //on new marker change, set new marker
  useEffect(() => {
    if (newMarkerLatLng !== null) {
      let pointInside = pointInPolygon([newMarkerLatLng.lng, newMarkerLatLng.lat], POLYGON);
      if (!pointInside) {
        alert("버들골 외부에는 메시지를 전송할수 없습니다!");
        return;
      }
      if (newMarker !== null) {
        newMarker.remove();
      }

      let el = document.createElement("div");
      el.className = "new-message";
      el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
      });

      let img = document.createElement("img");
      img.src = AddMessage;
      let guider = document.createElement("div");
      guider.innerText = "여기에 메시지 보내기";
      el.appendChild(img);
      el.appendChild(guider);

      el.addEventListener("click", (ev: any) => {
        ev.stopPropagation();
        handleAddNewMessage(newMarkerLatLng);
      });

      setNewMarker(new mapboxgl.Marker(el).setLngLat(newMarkerLatLng).addTo(mapRef.current));
    }
  }, [newMarkerLatLng]);

  //Delete New Marker if messagesendmode is false
  useEffect(() => {
    if (!messageSendMode && newMarker !== null) {
      newMarker.remove();
    }
  }, [messageSendMode, newMarker]);

  useEffect(() => {
    addMessagesMarker();
  }, [currentMessages, mapRef]);

  const addMessagesMarker = useCallback(() => {
    if (mapRef.current && typeof mapRef.current == "object") {
      currentMessages.forEach((chat: any) => {
        chat.messages.forEach((msg: any) => {
          //retrive from external function
          let el = createMessageMarker(chat, msg, user, handleMessageClick);
          new mapboxgl.Marker(el).setLngLat([msg.latLngPos.lng, msg.latLngPos.lat]).addTo(mapRef.current);
        });
      });
    }
  }, [currentMessages, user, handleMessageClick]);

  //On reset state change, zoom map back to initial
  useEffect(() => {
    async function execute() {
      if (resetState && mapRef.current && typeof mapRef.current == "object") {
        mapZoom(true);
        resetCompleted();
      }
    }
    execute();
  }, [resetState, mapRef]);

  async function mapZoomOnceIdle(zoomBoolean: any) {
    if (mapRef.current && typeof mapRef.current == "object") {
      window.setTimeout(() => {
        setDisplayMap(true);
        onMapDisplayed();
        mapZoom(zoomBoolean);
      }, 3500);
    }
  }

  async function mapZoom(zoomBoolean: any) {
    if (mapRef.current && typeof mapRef.current == "object") {
      if (zoomBoolean) {
        mapRef.current.flyTo({
          center: [INITIAL_POS.lng, INITIAL_POS.lat],
          zoom: 18,
          bearing: 180,
          speed: 1.5,
          curve: 1,
          easing: (t: any) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
      }
    }
  }

  async function mapZoomToCurrent() {
    if (document.querySelector(".current-pos")) {
      document.querySelector(".current-pos")?.remove();
    }
    let el = document.createElement("div");
    el.className = "current-pos";

    console.log("map zoom to current");
    console.log(currentPos);
    if (mapRef.current && typeof mapRef.current == "object") {
      if (currentPosPermittedStatus) {
        new mapboxgl.Marker(el).setLngLat([currentPos.lng, currentPos.lat]).addTo(mapRef.current);
        mapRef.current.flyTo({
          center: [currentPos.lng, currentPos.lat],
          zoom: 18,
          bearing: 180,
          speed: 1.5,
          curve: 1,
          easing: (t: any) => t,

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        });
      }
    }
  }

  const getSunPosition = () => {
    const center = mapRef.current.getCenter();
    const sunPos = SunCalc.getPosition(new Date(), center.lat, center.lng);
    const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
    const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
  };

  const getFog = () => {
    const time = SunCalc.getTimes(new Date(), pos.lat, pos.lng);
    if (new Date() < time.sunrise || new Date() > time.sunset) {
      return "rgba(224, 77, 148, 0.5)";
    }
    return "white";
  };
  getFog();

  return <S.MapContainer ref={mapContainerRef} displayMap={displayMap} />;
}
export default MapBox;
