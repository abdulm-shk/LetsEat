import React, { useState, useEffect } from "react";
import Restaurants from "./components/Restaurants";
import Header from "./components/Header";
import axios from "axios";

import "./App.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const [places, setPlaces] = useState([]);
  var test = process.env.REACT_APP_CLIENT_ID;
  var map = process.env.MAPBOX_TOKEN;
  // Automatically detect user geolocation
  //  Forursquare API call for Places in user's area!
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const END_POINT = "https://places.ls.hereapi.com/places/v1/discover/search?";
        const params = {
          apiKey: CLIENT_ID,
          at: `${position.coords.latitude},${position.coords.longitude}`.replace('+', ''),
          q: "restaurant",
        };
		var test = END_POINT + new URLSearchParams(params);
		console.log("URL:" + test);
        axios
          .get(END_POINT + new URLSearchParams(params))
          .then((res) => {
			console.log(res);
            setPlaces(res.data.results.items);
          })
          .catch((err) => {
            console.log("ERROR HAS OCURED: " + err);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  //console.log(places);
  return (
    <div className="App">
      <Header />
      <div>
        <Restaurants places={places} />
      </div>
    </div>
  );
}

export default App;
