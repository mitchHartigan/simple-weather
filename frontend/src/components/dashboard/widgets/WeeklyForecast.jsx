import React from "react";
import styled from "styled-components";

export function WeeklyForecast(props) {
  const { dailyForecast } = props.forecast;

  const SingleRow = (props) => {
    const { name, canonDate, temperature, icon } = props;
    return (
      <Row>
        <Text>{name}</Text>
        <Text>{canonDate}</Text>
        <Images>
          <ImgBox>
            <Img src={icon} alt="high icon" />
          </ImgBox>
        </Images>
        <Text>{temperature}°F</Text>
      </Row>
    );
  };

  const DoubleRow = (props) => {
    const { name, canonDate, temperature, icon } = props;
    return (
      <Row>
        <Text>{name}</Text>
        <Text>{canonDate}</Text>
        <Images>
          <ImgBox>
            <Img src={icon.high} alt="high icon" />
          </ImgBox>
          <ImgBox>
            <Img src={icon.low} alt="low icon" />
          </ImgBox>
        </Images>
        <Text>
          {temperature.high}°F / {temperature.low}°F
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
  margin: 0px 0px 10px 0px;
  border-radius: 5px;
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
  width: 500px;
`;

const Images = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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
  grid-template-columns: 25% 25% 25% 25%;
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
  width: 45px;
  height: auto;
`;
