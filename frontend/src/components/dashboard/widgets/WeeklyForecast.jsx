import React from "react";
import styled from "styled-components";

export function WeeklyForecast(props) {
  const { dailyForecast } = props.forecast;
  console.log("dailyForecast", dailyForecast);

  const SingleRow = (props) => {
    const { name, temperature, icon, humidity, precipitation } = props;
    return (
      <Row>
        <Text>{name}</Text>
        <Text>{temperature}°F</Text>
        <ImgBox>
          <Img src={icon} alt="high icon" />
        </ImgBox>
        <Text>{humidity}</Text>
        <Text>{precipitation}</Text>
      </Row>
    );
  };

  const DoubleRow = (props) => {
    const { name, temperature, icon, humidity, precipitation } = props;
    const { high, low } = precipitation;
    console.log("precipitation", precipitation);
    return (
      <Row>
        <Text>{name}</Text>
        <Text>
          {temperature.high}°F / {temperature.low}°F
        </Text>
        <ImgBox>
          <Img src={icon.high} alt="high icon" />
        </ImgBox>
        <ImgBox>
          <Img src={icon.low} alt="low icon" />
        </ImgBox>
        <Text>
          {high ? `${high}%` : "none"} / {low ? `${low}%` : "none"}
        </Text>
      </Row>
    );
  };

  return (
    <Container>
      <Body>
        {dailyForecast.map((period) => {
          const { single } = period;
          if (single) return <SingleRow {...period} />;
          return <DoubleRow {...period} />;
        })}
      </Body>
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
  width: 700px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p`
  margin: 0px 10px 0px 10px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 20% 15% 10% 15% 15% 15%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
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
