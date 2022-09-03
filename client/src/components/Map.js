import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { style } from "@mui/system";
import { Marker } from "react-map-gl";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1Ijoibmlydjk5IiwiYSI6ImNsN2pwenFraTBpdHUzb216bnZ2eG5ndG0ifQ.3C0GFB4RKgl-KKzKPDns0Q";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.1611);
  const [lat, setLat] = useState(32.7157);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat([-117.1611, 32.7157])
      .addTo(map.current);
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
