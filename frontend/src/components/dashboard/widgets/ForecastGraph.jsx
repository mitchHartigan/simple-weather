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
            <YAxis
              domain={["auto", "dataMax+20"]}
              width={25}
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <XAxis
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <Tooltip />
            <Area
              dataKey={"temperature"}
              stroke="#DC7B28"
              strokeWidth={2}
              fill="#c9533e"
              type="natural"
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
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
  width: 67vw;
`;

const Body = styled.div`
  display: flex;
  width: 70vw;
  height: 35vh;
`;
