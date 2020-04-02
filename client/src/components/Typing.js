import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 12px;
  display: inline-block;
  color: ${props => props.theme.subColor};
  font-size: 13px;
  word-break: break-word;
  line-height: 155%;
  font-style: italic;
`;

const Typing = ({ usernames }) => {
  return usernames.length < 3 ? (
    usernames.length === 1 ? (
      <Wrapper>{usernames[0]} is typing...</Wrapper>
    ) : (
      <Wrapper>
        {usernames[0]} and {usernames[1]} are typing...
      </Wrapper>
    )
  ) : (
    <Wrapper>Several people are typing...</Wrapper>
  );
};

Typing.propTypes = {
  usernames: PropTypes.array.isRequired
};

export default Typing;
