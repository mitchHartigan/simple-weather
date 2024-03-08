import React from "react";
import { useState, useEffect } from "react";
import { getForecast } from "../API";
import { MapView } from "../components/dashboard/widgets/MapView";
import { AtAGlance } from "../components/dashboard/widgets/index";

// do we actually need to store these coordinates? Maybe we display them in the ForecastDetails widget.
const defaultForecast = {
  coordinates: { lat: 33.4693663, lng: -117.6577678 },
  regionBounds: [
    [33.4822923, -117.6742156],
    [33.4600321, -117.6697109],
    [33.4637954, -117.6429692],
    [33.4860561, -117.6474688],
  ],
  dailyForecast: {},
  hourlyForecast: {},
  astralForecast: {},
};

export default function Dashboard() {
  const [forecast, setForecast] = useState(defaultForecast);

  useEffect(() => {
    async function mountState() {
      const { lat, lng } = forecast.coordinates;
      let newForecast = await getForecast(lat, lng);
      console.log("newForecast", newForecast);
    }
    mountState();
  }, []);

  return (
    <main>
      <MapView forecast={forecast} />
      <AtAGlance forecast={forecast} />
    </main>
  );
}