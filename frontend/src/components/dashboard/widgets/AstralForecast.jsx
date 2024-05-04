import React from "react";
import styled from "styled-components";

export function AstralForecast() {
  return (
    <Container>
      <Body></Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 450px;
  padding: 20px;
  padding-top: 40px;
  margin: 20px;
  border-radius: 5px;
  background-color: #45415c;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075);
`;

const Body = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
