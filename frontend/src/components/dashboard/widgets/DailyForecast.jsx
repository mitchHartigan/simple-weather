import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { genGraphData } from "./utils";

export function DailyForecast(props) {
  const { hourlyForecast } = props.forecast;
  const { detailedForecast } = props.forecast.details.currentPeriod;
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const data = genGraphData(hourlyForecast);
    setGraphData(data);
  }, []);

  return (
    <Container>
      <Body>DailyForecast</Body>
      <Text>{detailedForecast}</Text>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={graphData}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <YAxis domain={["dataMin", "dataMax"]} />
          <XAxis dataKey="time" />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="blue"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  width: 30vw;
  height: 10vh;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px lightgray;
  background-color: gray;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p``;
