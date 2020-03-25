import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  align-self: ${props => props.currentUser && "flex-end"};
  border-radius: ${props =>
    props.currentUser ? "16px 16px 0px 16px" : "0px 16px 16px 16px"};
  background: ${props =>
    props.currentUser ? props.theme.purple : props.theme.secondaryBgColor};
  color: ${props => (props.currentUser ? "#FFF" : props.theme.color)};
  margin-bottom: 14px;
  display: inline-block;
  padding: 12px 18px;
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  font-size: 15px;
  line-height: 155%;
  overflow-wrap: break-word;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Message = ({ currentUser, children }) => {
  return <Wrapper currentUser={currentUser}>{children}</Wrapper>;
};

Message.propTypes = {
  currentUser: PropTypes.bool,
  children: PropTypes.string.isRequired
};

export default Message;
