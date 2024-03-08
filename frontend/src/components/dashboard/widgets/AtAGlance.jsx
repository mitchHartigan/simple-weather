import React from "react";
import styled from "styled-components";

export function AtAGlance(props) {
  return (
    <Container>
      <Body>
        <ImgBox>
          <Img src="" />
        </ImgBox>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  width: 700px;
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

const Img = styled.div`
  width: 160px;
  height: auto;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
