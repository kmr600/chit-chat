import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlertCircle from "../icons/AlertCircle";

const Wrapper = styled.div`
  max-width: 100%;
  align-self: flex-end;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Bubble = styled.div`
  border-radius: 16px 16px 0px 16px;
  background: ${props => props.theme.info}; 
  color: #FFF;
  display: inline-block;
  padding: 12px 18px;
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  font-size: 15px;
  line-height: 155%;
  overflow-wrap: break-word;
  word-break: break-word;
`;


const Message = ({ children }) => {
  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Bubble>
            {children}
        </Bubble>
      </div>
    </Wrapper>
  );
};

Message.propTypes = {
  children: PropTypes.string
};

export default Message;
