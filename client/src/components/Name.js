import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 14px;
  display: inline-block;
  color: ${props =>
    props.theme.type === "light" ? "#444444" : props.theme.color};
  font-size: 15px;
  word-break: break-word;
  line-height: 155%;
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
