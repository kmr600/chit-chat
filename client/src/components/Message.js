import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlertCircle from "../icons/AlertCircle";

const Wrapper = styled.div`
  max-width: 100%;
  align-self: ${props => props.currentUser && "flex-end"};
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Bubble = styled.div`
  border-radius: ${props =>
    props.currentUser ? "16px 16px 0px 16px" : "0px 16px 16px 16px"};
  background: ${props =>
    props.currentUser ? props.theme.purple : props.theme.secondaryBgColor};
  color: ${props => (props.currentUser ? "#FFF" : props.theme.color)};
  display: inline-block;
  padding: 12px 18px;
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  font-size: 15px;
  line-height: 155%;
  overflow-wrap: break-word;
`;

const NotDelivered = styled.p`
  margin-top: 4px;
  margin-bottom: 14px;
  margin-left: auto;
  display: inline-block;
  color: red;
  font-size: 13px;
  word-break: break-word;
  line-height: 155%;
`;

const Message = ({ currentUser, error, errorMessage, children }) => {
  return (
    <Wrapper currentUser={currentUser}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Bubble currentUser={currentUser}>{children}</Bubble>
        {error && (
          <span style={{ marginLeft: "8px" }}>
            <AlertCircle />
          </span>
        )}
      </div>

      {error && <NotDelivered>Not Delivered - {errorMessage}</NotDelivered>}
    </Wrapper>
  );
};

Message.propTypes = {
  currentUser: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default Message;
