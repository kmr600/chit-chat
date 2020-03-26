import React, { Fragment, useCallback } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
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

const Chatroom = () => {
  // Redux
  const { user } = useSelector(state => state.auth);
  const { messages } = useSelector(state => state.chat);
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

  useSocket("join", ({ users, user: { username } }) => {
    // Add message to show that a user has joined the chat
    newMessageAction({ username, status: "join" });

    // Add newly joined user to user list
    addUserAction(username);

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

  return (
    <div id="outer-container">
      <Menu />

      <div id="page-wrap">
        <Header />

        <Container>
          <Chat>
            <Name host={true}>Kyle</Name>
            <Message>👋 Good evening, chat!</Message>
            <Message>
              Tonight we are building a chat app. Should be lots of fun! Tonight
              we are building a chat app. Should be lots of fun! Tonight we are
              building a chat app. Should be lots of fun! Tonight we are
              building a chat app. Should be lots of fun!
            </Message>

            <Name>zoubizoub</Name>
            <Message>I'm addicted to Overwatch...</Message>

            <Name>YorgYetson</Name>
            <Message>Bro, you have a problem...</Message>

            <Name>furnicarul069</Name>
            <Message>😂😂😂</Message>

            <Message currentUser={true}>C'mon guys, stay focused.</Message>

            <LeftChat>simon2610</LeftChat>

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

          <InputForm />
        </Container>
      </div>
    </div>
  );
};

export default Chatroom;
