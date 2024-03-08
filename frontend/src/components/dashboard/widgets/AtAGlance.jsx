import React from "react";
import styled from "styled-components";

export function AtAGlance(props) {
  const { currentPeriod, generatedAt } = props.forecast.details;
  const { shortForecast, icon, temperature } = currentPeriod;

  return (
    <Container>
      <Body>
        <ImgBox>
          <Img src={icon} alt="weather icon" />
        </ImgBox>
        <TextBox>
          <Title>Selected Location</Title>
          <Title>{temperature}</Title>
          <Text>{shortForecast}</Text>
          <Text>
            High: {"N/A"} Low: {"N/A"}
          </Text>
          <Text>{generatedAt}</Text>
        </TextBox>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  border-radius: 5px;
  box-shadow: 1px 1px lightgray;
  background-color: gray;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 160px;
  height: auto;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Text = styled.p``;

const Title = styled.h2``;
