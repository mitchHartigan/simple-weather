import React from "react";
import styled from "styled-components";

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { genDailyGraph } from "./utils";

export function DailyForecast(props) {
  const { hourlyForecast } = props.forecast;
  const { detailedForecast } = props.forecast.details.currentPeriod;
  const graphData = genDailyGraph(hourlyForecast);

  function renderLabel({ x, y, value }) {
    return (
      <text
        x={x + 10}
        y={y - 15}
        fill="white"
        fontFamily="Roboto"
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
              tick={{ fill: "white", fontFamily: "Roboto" }}
            />
            <Area
              dataKey="temperature"
              stroke="#DC7B28"
              fill="#C9533E"
              strokeWidth={2}
              label={renderLabel}
              type="natural"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBody>
      <IconRow>
        {graphData.map(({ icon }) => {
          return (
            <ImgBox>
              <Img src={icon} alt="small weather icon" />
            </ImgBox>
          );
        })}
      </IconRow>
      <Text>{detailedForecast}</Text>
    </Container>
  );
}

const IconRow = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 50px;
  height: auto;
`;

const Container = styled.div`
  margin: 10px 0px 10px 0px;
  padding: 20px;
  border-radius: 5px;
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
  width: 500px;
`;

const ChartBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 25vw;
  height: 12vh;
`;

const Text = styled.p`
  margin: 0px;
`;
