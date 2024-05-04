import React from "react";
import styled from "styled-components";
import {
  AreaChart,
  LineChart,
  Line,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { genHourlyGraph } from "./utils";

export default function ForecastGraph(props) {
  const { hourlyForecast } = props.forecast;
  const graphData = genHourlyGraph(hourlyForecast);

  return (
    <Container>
      <Body>
        <ResponsiveContainer height={220}>
          <LineChart data={graphData} syncId={"balls"}>
            <YAxis
              domain={["dataMin-5", "dataMax+5"]}
              width={25}
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <XAxis
              interval={2}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <Tooltip
              labelStyle={{ color: "#45415c" }}
              labelFormatter={(value) => `${value}:00`}
              formatter={(value) => `${value}°F`}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Line
              dataKey={"temperature"}
              stroke="#DC7B28"
              strokeWidth={2}
              type="natural"
            />
            <Line
              dataKey={"dewpoint"}
              stroke="#a84f71"
              strokeWidth={2}
              type="natural"
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={160}>
          <AreaChart data={graphData} syncId={"balls"}>
            <YAxis
              domain={[0, 100]}
              width={25}
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <XAxis
              interval={1}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <Tooltip
              labelStyle={{ color: "#45415c" }}
              labelFormatter={(value) => `${value}:00`}
              formatter={(value) => `${value}%`}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Area
              dataKey={"relativeHumidity"}
              stroke="#c9533e"
              strokeWidth={2}
              fill="#c47e72"
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
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
  width: 67vw;
`;

const Body = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
