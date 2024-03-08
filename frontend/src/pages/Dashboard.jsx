import React from "react";
import { useState, useEffect } from "react";
import { getForecast } from "../API";
import { MapView } from "../components/dashboard/widgets/MapView";
import {
  AtAGlance,
  DailyForecast,
} from "../components/dashboard/widgets/index";
import { sampleForecast } from "../sampleForecast";

/* 
const defaultForecast = {
  coordinates: { lat: 33.4693663, lng: -117.6577678 },
  regionBounds: [
    [33.4822923, -117.6742156],
    [33.4600321, -117.6697109],
    [33.4637954, -117.6429692],
    [33.4860561, -117.6474688],
  ],
  details: {},
  dailyForecast: {},
  hourlyForecast: {},
  astralForecast: {},
};
*/

export default function Dashboard() {
  const [forecast, setForecast] = useState(sampleForecast);

  async function updateCoords(newCoords) {
    const { lat, lng } = newCoords;
    const newForecast = await getForecast(lat, lng);
    console.log("newForecast", newForecast);
    setForecast(newForecast);
  }

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
      <MapView forecast={forecast} updateCoords={updateCoords} />
      <AtAGlance forecast={forecast} />
      <DailyForecast forecast={forecast} />
    </main>
  );
}
