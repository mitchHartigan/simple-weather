import React from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { genHourlyGraph } from "./utils";

export default function ForecastGraph(props) {
  const { hourlyForecast } = props.forecast;
  const graphData = genHourlyGraph(hourlyForecast);

  return (
    <Container>
      <Body>
        <ResponsiveContainer>
          <AreaChart data={graphData}>
            <YAxis domain={["dataMin-15", "dataMax+15"]} width={10} />
            <XAxis dataKey={"time"} />
            <Tooltip />
            <Area
              dataKey={"temperature"}
              stroke="blue"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
  padding-top: 40px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px lightgray;
  background-color: gray;
  width: 60vw;
`;

const Body = styled.div`
  display: flex;
  width: 70vw;
  height: 35vh;
`;
