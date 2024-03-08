import React from "react";
import styled, { keyframes } from "styled-components";

export const Spinner = (props) => {
  const { show } = props;
  return <Block show={show} />;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const Block = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  width: 25px;
  height: 25px;
  background-color: green;
  animation: ${rotate} 2s linear infinite;
`;
