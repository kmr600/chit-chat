import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 780px;
  width: 100%;
  margin: 60px auto;
`;

const Container = ({ children }) => <Wrapper>{children}</Wrapper>;

Container.propTypes = {
  children: PropTypes.any
};

export default Container;
