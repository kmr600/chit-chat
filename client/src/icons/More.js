import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 27px;
  height: 27px;
  fill: ${props => props.theme.color};
  stroke-width: 1.5;
`;

export default () => (
  <Svg
    viewBox="0 0 27 27"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="15" cy="12" r="3"></circle>
    <circle cx="24" cy="12" r="3"></circle>
  </Svg>
);
