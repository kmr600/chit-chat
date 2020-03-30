import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  stroke-width: 1.5;
  stroke: red;
`;

export default () => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="7" x2="12" y2="14"></line>
    <line x1="12" y1="16" x2="12" y2="18"></line>
  </Svg>
);
