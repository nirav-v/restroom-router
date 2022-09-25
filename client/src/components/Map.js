import React, { useRef, useEffect, useState, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { style } from "@mui/system";
import { Marker } from "react-map-gl";

import { NEARBY_RESTROOMS } from "../util/queries";
import { useQuery, useLazyQuery } from "@apollo/client";

import { useCoords } from "./NearbyRestroomsList";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

export default function Map() {
  const userCoords = useCoords(); // calling the use coords function attempts to get user's location

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.1611);
  const [lat, setLat] = useState(32.7157);
  const [zoom, setZoom] = useState(9);

  const [getNearbyRestrooms, { loading, error, data }] =
    useLazyQuery(NEARBY_RESTROOMS);
  // use lazy query so we can repeatedly call getNearbyRestrooms after the users location and data loads
  useEffect(() => {
    if (userCoords.coords) {
      const { lat, lon } = userCoords.coords;
      getNearbyRestrooms({
        variables: { lat, lon },
      });
    }
  }, [userCoords.coords, getNearbyRestrooms]);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    if (userCoords.coords) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [userCoords.coords.lon, userCoords.coords.lat], //center the map around the users coords after they load
        zoom: zoom,
      });
    }
  }, [userCoords.coords, data?.nearbyRestrooms, zoom]);

  useEffect(() => {
    if (userCoords.coords) {
      const rrArray = data?.nearbyRestrooms || {};
      for (let i = 0; i < rrArray.length; i++) {
        //   // //Create a default Marker and add it to the map.
        new mapboxgl.Marker({ color: "black" })
          .setLngLat([
            rrArray[i].location.coordinates[0],
            rrArray[i].location.coordinates[1],
          ])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `
          <p>${rrArray[i].areaDescription}<p/>
          <a href = ${`https://www.google.com/maps/place/${rrArray[i].location.coordinates[1]},${rrArray[i].location.coordinates[0]}`} target="__blank" > directions</a>
      
        `
            )
          )
          .addTo(map.current);
      }
    }
  });

  useEffect(() => {
    if (!map.current) {
      return; // wait for map to initialize
    }

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
      {userCoords.pending ? (
        <h2>
          Please wait a few seconds while we locate you and load the map :)
        </h2>
      ) : null}

      <div className="sidebar" style={sidebarStyle}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" style={mapStyle} />
    </div>
  );
}
