import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

import { getForecast } from "../API";
import { MapView } from "../components/dashboard/widgets/MapView";
import {
  AtAGlance,
  DailyForecast,
  WeeklyForecast,
  AstralForecast,
  Spinner,
} from "../components/dashboard/widgets/index";
import ForecastDetails from "../components/dashboard/widgets/ForecastDetails";
import ForecastGraph from "../components/dashboard/widgets/ForecastGraph";

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

  if (forecast?.details) {
    return (
      <Container>
        <Spinner show={loading} />
        <Area1>
          <AtAGlance forecast={forecast} updateCoords={updateCoords} />
          <DailyForecast forecast={forecast} />
          <WeeklyForecast forecast={forecast} />
        </Area1>
        <Area2>
          <SubArea2>
            <MapView
              forecast={forecast}
              updateCoords={updateCoords}
              loading={loading}
            />
            <SubArea3>
              <ForecastDetails forecast={forecast} />
              <AstralForecast forecast={forecast} />
            </SubArea3>
          </SubArea2>
          <ForecastGraph forecast={forecast} />
        </Area2>
      </Container>
    );
  }
  return (
    <Container>
      <p>Loading....</p>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: center;
  align-items: flex-start;
`;

const Area1 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Area2 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubArea2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SubArea3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
