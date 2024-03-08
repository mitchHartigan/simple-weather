import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
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
      <ChartBody>
        <ResponsiveContainer>
          <AreaChart data={graphData}>
            <YAxis
              domain={["dataMin-2", "dataMax"]}
              axisLine={false}
              tick={false}
            />
            <XAxis dataKey="time" />
            <Area
              dataKey="temperature"
              stroke="blue"
              fill="lightblue"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBody>
      <Text>{detailedForecast}</Text>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px lightgray;
  background-color: gray;
`;

const ChartBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 35vw;
  height: 13vh;
`;

const Text = styled.p``;
