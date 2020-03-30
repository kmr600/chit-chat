import React, { Fragment, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import VisibilitySensor from "react-visibility-sensor";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Container from "../components/Container";
import Name from "../components/Name";
import Message from "../components/Message";
import JoinChat from "../components/JoinChat";
import LeftChat from "../components/LeftChat";
import InputForm from "../components/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { loadUsers, addUser, removeUser, newMessage } from "../actions/chat";

const Chat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StartConversation = styled.p`
  margin-top: 12px;
  margin-bottom: 14px;
  display: inline-block;
  color: ${props => props.theme.subColor};
  font-size: 13px;
  word-break: break-word;
  line-height: 155%;
`;

const ScrollToBottom = styled.button`
  padding: 18px 36px;
  background-color: ${props => props.theme.color}E6;
  color: ${props => props.theme.bgColor};
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  border-radius: 60px;
  position: fixed;
  bottom: 11%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

const Chatroom = () => {
  const inputForm = useRef(null);

  // Redux
  const { user } = useSelector(state => state.auth);
  const { messages } = useSelector(state => state.chat);
  const { isOpen } = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const loadUsersAction = useCallback(
    payload => {
      dispatch(loadUsers(payload));
    },
    [dispatch]
  );
  const addUserAction = useCallback(
    payload => {
      dispatch(addUser(payload));
    },
    [dispatch]
  );
  const removeUserAction = useCallback(
    payload => {
      dispatch(removeUser(payload));
    },
    [dispatch]
  );
  const newMessageAction = useCallback(
    payload => {
      dispatch(newMessage(payload));
    },
    [dispatch]
  );

  useSocket("newMessage", data => {
    newMessageAction(data);
  });

  useSocket("join", ({ users, error, user }) => {
    // handle any errors if new users try to join
    if (error) return;

    // Add message to show that a user has joined the chat
    newMessageAction({ username: user.username, status: "join" });

    // Add newly joined user to user list
    addUserAction(user.username);

    // Load list of users from the backend
    loadUsersAction(users);
  });

  useSocket("leave", ({ users, username }) => {
    // Add message to show that a user has left
    newMessageAction({ username, status: "leave" });

    // Remove user who left chat
    removeUserAction(username);

    // Load list of users from the backend
    loadUsersAction(users);
  });

  const scrollToBottom = () => {
    inputForm.current.scrollIntoView();
  };

  const [inputInView, setInputInView] = useState(true);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  return (
    <div id="outer-container">
      <Menu />

      <div id="page-wrap">
        <Header />

        {((!inputInView && !isOpen) || (inputIsFocused && !isOpen)) && (
          <ScrollToBottom onClick={() => scrollToBottom()}>
            Scroll to bottom
          </ScrollToBottom>
        )}

        <Container>
          <Chat>
            {messages.length === 0 && (
              <StartConversation>
                Send a message to start a conversation
              </StartConversation>
            )}

            {messages.map((message, key, allMessages) => {
              return message.message ? (
                message.username === user.username ? (
                  <Message currentUser={true} key={key}>
                    {message.message}
                  </Message>
                ) : (
                  <Fragment key={key}>
                    {/* don't show username if previous message was sent by the same user */}
                    {(key === 0 ||
                      allMessages[key - 1].username !== message.username) && (
                      <Name>{message.username}</Name>
                    )}
                    <Message>{message.message}</Message>
                  </Fragment>
                )
              ) : message.status === "join" ? (
                <JoinChat key={key}>{message.username}</JoinChat>
              ) : (
                <LeftChat key={key}>{message.username}</LeftChat>
              );
            })}
          </Chat>

          <VisibilitySensor onChange={isVisible => setInputInView(isVisible)}>
            <>
              <InputForm />
              <div
                ref={inputForm}
                onFocus={() => setInputIsFocused(true)}
                onBlur={() => setInputIsFocused(false)}
              />
            </>
          </VisibilitySensor>
        </Container>
      </div>
    </div>
  );
};

export default Chatroom;
