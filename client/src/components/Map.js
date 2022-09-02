import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import {NEARBY_RESTROOMS} from '../util/queries'

mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlydjk5IiwiYSI6ImNsN2pwenFraTBpdHUzb216bnZ2eG5ndG0ifQ.3C0GFB4RKgl-KKzKPDns0Q";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

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
    backgroundColor: 'rgba(35, 55, 75, 0.9)',
    color: "#fff",
    padding: "6px 12px",
    fontFamily: 'monospace',
    ZIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: "12px",
    borderRadius: "4px",
  };
  return (
    <div>
      <div className="sidebar" style={sidebarStyle}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" style={mapStyle}/>
    </div>
  );
}
