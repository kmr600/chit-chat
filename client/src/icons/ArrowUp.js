import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 24px;
  height: 24px;
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
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </Svg>
);
