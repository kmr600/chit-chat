import React, { useCallback } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import ArrowLeft from "../icons/ArrowLeft";
import More from "../icons/More";
import { useDispatch } from "react-redux";
import { chatLeave } from "../actions/auth";

const Wrapper = styled.div`
  padding: 25px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 780px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const Header = () => {
  // Redux
  const dispatch = useDispatch();
  const chatLeaveAction = useCallback(() => {
    dispatch(chatLeave());
  }, [dispatch]);

  const { socket } = useSocket("leave", ({ username }) => {
    console.log(username + " left the chat");
    chatLeaveAction();
  });

  return (
    <Wrapper>
      <Container>
        <button onClick={() => socket.emit("leave")}>
          <ArrowLeft />
        </button>

        <Title>Chat</Title>

        <More />
      </Container>
    </Wrapper>
  );
};

export default Header;
