import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #000;
  stroke-width: 1.5;
`;

export default () => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </Svg>
);
