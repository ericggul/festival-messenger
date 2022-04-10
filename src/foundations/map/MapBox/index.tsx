import * as S from "./styles";
import { useEffect, useRef, useState, useCallback } from "react";
import useResize from "@/utils/hooks/useResize";
// @ts-ignore
import mapboxgl from "!mapbox-gl"; /* eslint import/no-webpack-loader-syntax: off */
import "mapbox-gl/dist/mapbox-gl.css";
import "./marker.css";
import SunCalc from "suncalc";

//Icons
import AddMessage from "@I/icons/map/add-message.svg";

const RECEIVED = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95603, 37.45879],
      },
      properties: {
        chatId: "BVFlCeV99yNcXfy6XVJJ",
        messageId: "tpt8EF71hXt5udC0hpLP",
        profileImg: "https://laboratory-occupied.com/assets/images/1ArtNoveau/1.png",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95646, 37.45919],
      },
      properties: {
        chatId: "FWf8NAji0t65xYqay2n3",
        messageId: "3kh8eSRttdkjZSl1Iksn",
        profileImg: "https://laboratory-occupied.com/assets/images/7Shitga/3.png",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95604, 37.45809],
      },
      properties: {
        chatId: "Hqwr1MYuGfDDWG0zyfGm",
        messageId: "9GYU9MACmzP1YSvWwoCm",
        profileImg: "https://laboratory-occupied.com/assets/images/9WhiteMonuments/0.png",
      },
    },
  ],
};

const SENT = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95545, 37.45878],
      },
      properties: {
        chatId: "Hqwr1MYuGfDDWG0zyfGm",
        messageId: "9GYU9MACmzP1YSvWwoCm",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95568, 37.45898],
      },
      properties: {
        chatId: "Hqwr1MYuGfDDWG0zyfGm",
        messageId: "9GYU9MACmzP1YSvWwoCm",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95541, 37.45864],
      },
      properties: {
        chatId: "Hqwr1MYuGfDDWG0zyfGm",
        messageId: "9GYU9MACmzP1YSvWwoCm",
      },
    },
  ],
};

const AD = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [126.95653, 37.45822],
      },
      properties: {
        id: "messageId",
      },
    },
  ],
};

function MapBox({
  handleMessageClick,
  handleAddNewMessage,
  messageSendMode,

  resetState,
  resetCompleted,
  zoomIn = false,
}: any) {
  mapboxgl.accessToken = "pk.eyJ1IjoiZXJpY2dndWwiLCJhIjoiY2wwMmkyYTRkMTRhczNobHNsMnBxb3BkMyJ9.DLFELyGRBinEC75rdCGBBQ";
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
        style: "mapbox://styles/ericggul/cl0nx2gmt000a14sdee853joe",
        attributionControl: false,
      });

      return () => {
        mapRef.current = null;
      };
    }
  }, [mapContainerRef]);

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
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
              "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
              "fill-extrusion-opacity": 0.6,
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

        mapRef.current.addLayer({
          id: "hillshading",
          source: "mapbox-dem",
          type: "hillshade",
        });

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
            "sky-atmosphere-halo-color": "rgba(255, 255, 255, 0.5)",
            "sky-atmosphere-sun-intensity": 5,
            "sky-atmosphere-sun": getSunPosition(),
          },
        });
      });

      //Error Handling
      mapRef.current.on("error", (e: any) => {
        if (e && e.error !== "Error: Not Found") {
          console.log(e.error);
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

      mapRef.current.addControl(
        new mapboxgl.GeolocateControl({
          fitBoundsOptions: { maxZoom: 19 },
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    }

    mapZoomOnceIdle(zoomIn);
    addMessagesMarker();
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
          console.log("clicked");
          setNewMarkerLatLng(e.lngLat);
        });
      }
    }
  }, [mapRef, messageSendMode]);

  //on new marker change, set new marker
  useEffect(() => {
    if (newMarkerLatLng !== null) {
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

  function addMessagesMarker() {
    if (mapRef.current && typeof mapRef.current == "object") {
      SENT.features.map((feature, i) => {
        let el = document.createElement("div");
        el.className = "marker sent";

        el.addEventListener("click", (ev: any) => {
          handleMessageClick(feature.properties.chatId, feature.properties.messageId);
          ev.stopPropagation();
        });

        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(mapRef.current);
      });

      RECEIVED.features.map((feature, i) => {
        let el = document.createElement("div");
        el.className = "marker received";

        if (feature.properties.profileImg) {
          let img = document.createElement("img");
          img.src = feature.properties.profileImg;
          el.appendChild(img);
        } else {
          el.className += "no-img";
        }

        el.addEventListener("click", (ev: any) => {
          handleMessageClick(feature.properties.chatId, feature.properties.messageId);
          ev.stopPropagation();
        });

        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(mapRef.current);
      });

      AD.features.map((feature, i) => {
        let el = document.createElement("div");
        el.className = "marker ad";

        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(mapRef.current);
      });
    }
  }

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
    console.log("here", mapRef.current);
    if (mapRef.current && typeof mapRef.current == "object") {
      window.setTimeout(() => {
        setDisplayMap(true);
        mapZoom(zoomBoolean);
      }, 3000);
    }
  }

  async function mapZoom(zoomBoolean: any) {
    if (mapRef.current && typeof mapRef.current == "object") {
      if (zoomBoolean) {
        console.log(zoomBoolean);
        mapRef.current.flyTo({
          center: [INITIAL_POS.lng, INITIAL_POS.lat],
          zoom: 18,
          bearing: 180,
          speed: 0.7,
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
      return "rgb(0, 0, 20)";
    }
    return "white";
  };
  getFog();

  return <S.MapContainer ref={mapContainerRef} displayMap={displayMap} />;
}
export default MapBox;
