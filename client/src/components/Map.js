import React, { useRef, useEffect, useState, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { style } from "@mui/system";
import { Marker } from "react-map-gl";

import { ALL_RESTROOMS } from "../util/queries";
import { useQuery } from "@apollo/client";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1Ijoibmlydjk5IiwiYSI6ImNsN2pwenFraTBpdHUzb216bnZ2eG5ndG0ifQ.3C0GFB4RKgl-KKzKPDns0Q";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.1611);
  const [lat, setLat] = useState(32.7157);
  const [zoom, setZoom] = useState(9);
  const [rrArray, setrrArray] = useState();

  const { loading, data, error } = useQuery(ALL_RESTROOMS);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    const rrArray = data?.allRestrooms || {};
    for (let i =0; i < rrArray.length; i++){
      console.log(rrArray[i])
          //   // //Create a default Marker and add it to the map.
    new mapboxgl.Marker({ color: "black" })
      .setLngLat([rrArray[i].location.coordinates[0], rrArray[i].location.coordinates[1]])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${rrArray[i].areaDescription}<p/>`))
      .addTo(map.current);
    }


  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const mapStyle = {
    height: "400px",
  };

  const sidebarStyle = {
    backgroundColor: "rgba(35, 55, 75, 0.9)",
    color: "#fff",
    padding: "6px 12px",
    fontFamily: "monospace",
    ZIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    margin: "12px",
    borderRadius: "4px",
  };

  const markerStyle = {
    backgroundImage: "url('mapbox-icon.png')",
    backgroundSize: "cover",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer",
  };

  return (
    <div>
      <div className="sidebar" style={sidebarStyle}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" style={mapStyle} />
    </div>
  );
}
