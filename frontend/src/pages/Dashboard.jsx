import React from "react";
import { useState, useEffect } from "react";
import { getForecast } from "../API";
import { MapView } from "../components/dashboard/widgets/MapView";
import {
  AtAGlance,
  DailyForecast,
  WeeklyForecast,
  Spinner,
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
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  async function updateCoords(newCoords) {
    const { lat, lng } = newCoords;
    setLoading(true);
    setForecast({ ...forecast, coordinates: newCoords });
    const newForecast = await getForecast(lat, lng);
    setForecast(newForecast);
    setLoading(false);
    console.log("newForecast", newForecast);
  }

  useEffect(() => {
    async function mountState() {
      updateCoords({ lat: 33.4693663, lng: -117.6577678 });
    }
    mountState();
  }, []);

  console.log("forecast", forecast);
  if (forecast?.details) {
    return (
      <main>
        <Spinner show={loading} />
        <MapView
          forecast={forecast}
          updateCoords={updateCoords}
          loading={loading}
        />
        <AtAGlance forecast={forecast} />
        <DailyForecast forecast={forecast} />
        <WeeklyForecast forecast={forecast} />
      </main>
    );
  }
  return (
    <main>
      <p>Loading....</p>
    </main>
  );
}
