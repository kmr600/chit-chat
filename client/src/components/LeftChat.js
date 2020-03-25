import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 14px;
  display: inline-block;
  color: ${props => props.theme.subColor};
  font-size: 13px;
  word-break: break-word;
`;

const LeftChat = ({ children }) => {
  return <Wrapper>{children} has left the chat. Now the fun begins (;</Wrapper>;
};

LeftChat.propTypes = {
  children: PropTypes.string.isRequired
};

export default LeftChat;
