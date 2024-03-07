import React from "react";
import styled from "styled-components";

export function Overview(props) {
  const { periods } = props.forecast.properties;
  return (
    <Container>
      <Cell>
        <h1>Overview</h1>
        <img
          src={periods[0].icon}
          width="120px"
          height="120px"
          alt="weather icon"
        />
      </Cell>
      <Cell>
        <h1>{periods[0].name}</h1>
        <h2>{periods[0].shortForecast}</h2>
        <h3>{periods[0].detailedForecast}</h3>
      </Cell>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
