import React, { useEffect, useState } from "react";
import MapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./RestaurantsMap.css";
import ExtraRestaurants from "./ExtraRestaurants";
import user_position_marker from "../images/user-position-marker.png";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function RestaurantsMap(props) {
  const [userLat, setUserLat] = useState(43.7189);
  const [userLong, setUserLong] = useState(-79.8533);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 880,
    latitude: userLat,
    longitude: userLong,
    zoom: 10,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
        setViewPort({
          width: "100%",
          height: 880,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 13,
        });
      });
    }
  }, []);

  const _onViewportChange = (viewport) => {
    setViewPort({
      ...viewport,
    });
  };

  //console.log("restMap" + userLong + userLat);
  return (
    <div className="map">
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={_onViewportChange}
        onDblClick={props._handleClick}
      >
        <Marker latitude={userLat} longitude={userLong}>
          <button
            className="marker"
            onClick={(e) => {
              e.preventDefault();
              setSelectedLocation("Your current location!");
            }}
          >
            <img src={user_position_marker} alt="user-position-marker" />
          </button>
        </Marker>

        <div className="navigation-control">
          <NavigationControl />
        </div>

        {selectedLocation ? (
          <Popup
            latitude={userLat}
            longitude={userLong}
            onClose={() => {
              setSelectedLocation(null);
            }}
          >
            <div>
              <h3 className="restaurant-title">{selectedLocation}</h3>
            </div>
          </Popup>
        ) : null}

        <ExtraRestaurants places={props.places} />
      </MapGL>
    </div>
  );
}

export default RestaurantsMap;
