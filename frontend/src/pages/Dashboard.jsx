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
        <SideBar>
          <AtAGlance forecast={forecast} updateCoords={updateCoords} />
          <DailyForecast forecast={forecast} />
          <WeeklyForecast forecast={forecast} />
        </SideBar>
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
  display: grid;
  grid-template-columns: 25vw 1fr;
  width: 100%;
  height: 100%;
`;

const SideBar = styled.section`
  position: fixed;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  background-color: blue;
  width: 25vw;
  height: 100%;
  grid-column: 1/2;
`;

const Area2 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: red;
  width: 100%;
  padding: 0px 10px 0px 10px;
  box-sizing: border-box;
  grid-column: 2/3;
`;

const SubArea2 = styled.div`
  height: 45vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: orange;
  width: 100%;
  margin: 10px 0px 10px 0px;
`;

const SubArea3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: purple;
  width: 100%;
`;
