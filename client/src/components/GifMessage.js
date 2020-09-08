import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlertCircle from "../icons/AlertCircle";
import {Gif} from "@giphy/react-components"

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
  word-break: break-word;
`;

const Message = ({ currentUser, gif }) => {

  return (
    <Wrapper currentUser={currentUser}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Bubble currentUser={currentUser}>
          <Gif hideAttribution gif={gif} width={200} height={200} />
        </Bubble>
      </div>
    </Wrapper>
  );
};

Message.propTypes = {
  currentUser: PropTypes.bool,
};

export default Message;
