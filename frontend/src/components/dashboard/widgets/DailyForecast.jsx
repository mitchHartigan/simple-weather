import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { genGraphData } from "./utils";

export function DailyForecast(props) {
  const { hourlyForecast } = props.forecast;
  const { detailedForecast } = props.forecast.details.currentPeriod;

  const graphData = genGraphData(hourlyForecast);

  const Printer = (props) => {
    console.log({ props });
    return <p>{props.value}</p>;
  };

  function renderLabel({ x, y, value }) {
    return (
      <text
        x={x + 10}
        y={y - 15}
        fill="white"
        textAnchor="end"
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  }

  return (
    <Container>
      <ChartBody>
        <ResponsiveContainer>
          <AreaChart data={graphData}>
            <YAxis
              domain={["dataMin-2", "dataMax"]}
              axisLine={false}
              tick={false}
              width={10}
              padding={{ top: 18 }}
            />
            <XAxis
              dataKey="time"
              padding={{ left: 15, right: 15 }}
              tick={{ fill: "white" }}
            />
            <Area
              dataKey="temperature"
              stroke="blue"
              fill="lightblue"
              strokeWidth={3}
              label={renderLabel}
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
  padding-top: 40px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px lightgray;
  background-color: gray;
`;

const ChartBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 30vw;
  height: 15vh;
`;

const Text = styled.p``;
