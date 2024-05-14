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
  CartesianGrid,
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
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
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
              dot={{ strokeWidth: 1, fill: "#DC7B28" }}
            />
            <Line
              dataKey={"dewpoint"}
              stroke="#774867"
              strokeWidth={2}
              type="natural"
              dot={{ strokeWidth: 2, fill: "#774867" }}
            />
            <Line
              dataKey={"apparentTemperature"}
              stroke="#c9533e"
              strokeWidth={2}
              type="natural"
              dot={{ strokeWidth: 1, fill: "#c9533e" }}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={130}>
          <LineChart data={graphData} syncId="balls">
            <YAxis
              domain={[0, 100]}
              width={25}
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <XAxis
              interval={2}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
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
            <Line
              dataKey={"precipitation"}
              stroke="#2176AE"
              strokeWidth={3}
              type="monotone"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={120}>
          <LineChart data={graphData} syncId="balls">
            <YAxis width={30} tick={{ fill: "white", fontFamily: "Roboto" }} />
            <XAxis
              interval={2}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
              labelStyle={{ color: "#45415c" }}
              labelFormatter={(value) => `${value}:00`}
              formatter={(value) => `${value}`}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Line
              dataKey={"cloudCover"}
              stroke="blue"
              strokeWidth={3}
              type="monotone"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={120}>
          <LineChart data={graphData} syncId="balls" height={120}>
            <YAxis
              domain={[0, 100]}
              width={25}
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <XAxis
              interval={2}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
              labelStyle={{ color: "#45415c" }}
              labelFormatter={(value) => `${value}:00`}
              formatter={(value) => `${value}`}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Line
              dataKey={"relativeHumidity"}
              stroke="red"
              strokeWidth={3}
              type="linear"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={120}>
          <LineChart data={graphData} syncId="balls">
            <YAxis width={25} tick={{ fill: "white", fontFamily: "Roboto" }} />
            <XAxis
              interval={2}
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
              labelStyle={{ color: "#45415c" }}
              labelFormatter={(value) => `${value}:00`}
              formatter={(value) => `${value}`}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Line
              dataKey={"uvIndex"}
              stroke="blue"
              strokeWidth={3}
              type="monotone"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={120}>
          <LineChart data={graphData} syncId="balls">
            <YAxis width={25} tick={{ fill: "white", fontFamily: "Roboto" }} />
            <XAxis
              dataKey={"time"}
              tick={{ fill: "white", fontFamily: "Roboto" }}
              padding={{ left: 0, right: 15 }}
            />
            <CartesianGrid strokeDasharray="5" vertical={false} />
            <Tooltip
              contentStyle={{ borderRadius: "5px" }}
              labelStyle={{ color: "#45415c" }}
              itemStyle={{ fontFamily: "Roboto", fontSize: "14px" }}
              isAnimationActive={false}
            />
            {graphData.map((period, i) => {
              if (period.time === "00") {
                return <ReferenceLine x={i} stroke="lightgray" />;
              }
            })}
            <Line
              dataKey={"surfacePressure"}
              stroke="blue"
              strokeWidth={3}
              type="monotone"
              dot={false}
            />
          </LineChart>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
