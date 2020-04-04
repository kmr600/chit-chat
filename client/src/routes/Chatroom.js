import React, { Fragment, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import VisibilitySensor from "react-visibility-sensor";
import UIfx from "uifx";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Container from "../components/Container";
import Name from "../components/Name";
import Message from "../components/Message";
import JoinChat from "../components/JoinChat";
import LeftChat from "../components/LeftChat";
import Typing from "../components/Typing";
import InputForm from "../components/InputForm";
import allEyesAudio from "../sounds/all-eyes-on-me.mp3";
import { useSelector, useDispatch } from "react-redux";
import { chatJoinSuccess } from "../actions/auth";
import {
  loadUsers,
  addUser,
  removeUser,
  newMessage,
  setMessageError,
  addUserToTyping,
  removeUserFromTyping
} from "../actions/chat";
import findLastIndex from "../utils/findLastIndex";

// sounds
const allEyes = new UIfx(allEyesAudio, {
  volume: 1.0,
  throttleMs: 100
});

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
  const { messages, typing } = useSelector(state => state.chat);
  const { isOpen } = useSelector(state => state.menu);
  const { soundNotifications } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const chatJoinSuccessAction = useCallback(
    payload => {
      dispatch(chatJoinSuccess(payload));
    },
    [dispatch]
  );
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
  const setMessageErrorAction = useCallback(
    payload => {
      dispatch(setMessageError(payload));
    },
    [dispatch]
  );
  const addUserToTypingAction = useCallback(
    payload => {
      dispatch(addUserToTyping(payload));
    },
    [dispatch]
  );
  const removeUserFromTypingAction = useCallback(
    payload => {
      dispatch(removeUserFromTyping(payload));
    },
    [dispatch]
  );

  useSocket("newMessage", data => {
    newMessageAction(data);

    // if sounds notifications are on, play audio for incoming messages
    if (soundNotifications) {
      allEyes.play();
    }
  });

  useSocket("typing", ({ typing }) => {
    addUserToTypingAction(typing);
  });
  useSocket("notTyping", ({ typing }) => {
    removeUserFromTypingAction(typing);
  });

  useSocket("join", ({ users, user, error }) => {
    chatJoinSuccessAction(user);

    // load list of users from the backend
    loadUsersAction(users);
  });

  useSocket("userHasJoined", ({ users, error, user }) => {
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

  useSocket("rateLimitReached", ({ error }) => {
    // get index of message so that an error can be applied
    const indexOfNotDelivered = findLastIndex(
      messages,
      "username",
      user.username
    );
    setMessageErrorAction({ index: indexOfNotDelivered, error });
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
                  <Message
                    currentUser={true}
                    error={message.error ? true : false}
                    errorMessage={message.error ? message.errorMessage : null}
                    key={key}
                  >
                    {message.message}
                  </Message>
                ) : (
                  <Fragment key={key}>
                    {/* don't show username if previous message was sent by the same user */}
                    {/* show username if previous message was a status message such as join or leave */}
                    {(key === 0 ||
                      allMessages[key - 1].username !== message.username ||
                      (allMessages[key - 1].username === message.username &&
                        (allMessages[key - 1].status === "join" ||
                          allMessages[key - 1].status === "leave"))) && (
                      <Name time={message.time}>{message.username}</Name>
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

            {typing.length > 0 && <Typing usernames={typing} />}
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
