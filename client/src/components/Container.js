import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 980px;
  width: 100%;
  margin: 60px auto;
  padding: 0 30px;
  @media (max-width: 768px) {
    padding: 0 60px;
  }
  @media (max-width: 425px) {
    margin: 30px auto;
    padding: 0 30px;
  }
`;

const Container = ({ children }) => <Wrapper>{children}</Wrapper>;

Container.propTypes = {
  children: PropTypes.any
};

export default Container;
