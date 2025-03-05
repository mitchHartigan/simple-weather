import React from "react";
import styled from "styled-components";
import { metresToFeet, celsiusToFahrenheit } from "./utils";

export default function ForecastDetails(props) {
  const { elevation } = props.forecast.details;
  const {
    dewpoint,
    relativeHumidity,
    probabilityOfPrecipitation,
    windDirection,
    windSpeed,
  } = props.forecast.details.currentPeriod;

  return (
    <Container>
      <Body>
        <Title>Forecast Region</Title>
        <Row>
          <Text>Elevation</Text>
          <Text>{metresToFeet(elevation.value)}ft</Text>
        </Row>
        <Row>
          <Text>Dewpoint</Text>
          <Text>{celsiusToFahrenheit(dewpoint.value)}°F</Text>
        </Row>
        <Row>
          <Text>Humidity</Text>
          <Text>{relativeHumidity.value}%</Text>
        </Row>
        <Row>
          <Text>Precipitation</Text>
          <Text>{probabilityOfPrecipitation.value}%</Text>
        </Row>
        <Row>
          <Text>Wind</Text>
          <Text>
            {windSpeed} {windDirection}
          </Text>
        </Row>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  margin: 0px 10px 10px 10px;
  padding: 20px;
  width: 400px;
  border-radius: 5px;
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
  box-sizing: border-box;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h3``;

const Text = styled.p`
  margin: 0px 10px 0px 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
