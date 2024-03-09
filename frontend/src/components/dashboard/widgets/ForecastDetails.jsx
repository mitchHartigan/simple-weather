import React from "react";
import styled from "styled-components";

export default function ForecastDetails() {
  return (
    <Container>
      <Body></Body>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
  width: 600px;
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
