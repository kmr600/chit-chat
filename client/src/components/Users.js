import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OnlineWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const OnlineCircle = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #60d15e;
  border-radius: 50%;
  margin-right: 10px;
`;

const OnlineText = styled.p`
  color: ${props => props.theme.subColor};
  font-size: 15px;
`;

const List = styled.ul`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const User = styled.li`
  margin-bottom: 15px;
  font-size: 15px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Users = () => {
  // Redux
  const { users } = useSelector(state => state.chat);

  return (
    <Wrapper>
      <OnlineWrapper>
        <OnlineCircle />
        <OnlineText>{users.length} online</OnlineText>
      </OnlineWrapper>

      <List>
        {users.map(user => (
          <User key={user}>{user}</User>
        ))}
      </List>
    </Wrapper>
  );
};

export default Users;
