import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 14px;
  display: inline-block;
  color: #444444;
  font-size: 15px;
  word-break: break-word;
`;

const Name = ({ children, host }) => {
  return (
    <Wrapper>
      {host && (
        <span role="img" aria-label="logo">
          👑&nbsp;
        </span>
      )}
      {children}
    </Wrapper>
  );
};

Name.propTypes = {
  children: PropTypes.string.isRequired,
  host: PropTypes.bool
};

export default Name;
