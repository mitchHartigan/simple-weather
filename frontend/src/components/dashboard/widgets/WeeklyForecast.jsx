import React from "react";
import styled from "styled-components";

export function WeeklyForecast(props) {
  const { dailyForecast } = props.forecast;
  console.log("dailyForecast", dailyForecast);

  const SingleRow = (props) => {
    const { name, temperature, icon } = props;
    console.log("temp", temperature);
    return (
      <Row>
        <Text>{name}</Text>
        <Text>{temperature}</Text>
        <ImgBox>
          <Img src={icon} alt="high icon" />
        </ImgBox>
      </Row>
    );
  };

  const DoubleRow = (props) => {
    const { name, temperature, icon } = props;
    return (
      <Row>
        <Text>{name}</Text>
        <Text>{temperature.high}/</Text>
        <Text>{temperature.low}</Text>
        <ImgBox>
          <Img src={icon.high} alt="high icon" />
        </ImgBox>
        <ImgBox>
          <Img src={icon.low} alt="low icon" />
        </ImgBox>
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

const Text = styled.p``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
