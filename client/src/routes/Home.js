import React, { useState, useEffect, useRef, useCallback } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import Filter from "bad-words";
import { useSelector, useDispatch } from "react-redux";
import {
  chatJoinSuccess,
  chatJoinFail,
  chatJoinLoading
} from "../actions/auth";
import { loadUsers } from "../actions/chat";
import Container from "../components/Container";

const filter = new Filter();

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 159px 0 38px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 7px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.color};
  outline: none;
  color: ${props => props.theme.color};
  font-family: ${props => props.theme.font};
  font-size: 15px;
  line-height: 155%;
  resize: none;
  text-align: center;
  &::placeholder {
    color: ${props => props.theme.color}4D;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
`;

const Button = styled.button`
  margin: 41px auto 0;
  padding: 7px 0;
  width: 50%;
  max-width: 300px;
  background: ${props => props.theme.purple};
  color: #fff;
  border-radius: 16px;
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  cursor: pointer;
`;

const Error = styled.p`
  font-size: 15px;
  margin: 20px 0;
  color: red;
`;

const Home = () => {
  // set focus to input on load
  const input = useRef(null);
  useEffect(() => {
    if (input) input.current.focus();
  }, [input]);

  // Redux
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const chatJoinSuccessAction = useCallback(
    payload => {
      dispatch(chatJoinSuccess(payload));
    },
    [dispatch]
  );
  const chatJoinFailAction = useCallback(() => {
    dispatch(chatJoinFail());
  }, [dispatch]);
  const loadingAction = useCallback(() => {
    dispatch(chatJoinLoading());
  }, [dispatch]);
  const loadUsersAction = useCallback(
    payload => {
      dispatch(loadUsers(payload));
    },
    [dispatch]
  );

  const [error, setError] = useState("");

  const [data, setData] = useState({
    username: ""
  });

  const { username } = data;

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // check if username has content
    if (!username.length) return;

    // cancel submission if username has profanity
    if (filter.isProfane(username)) {
      setError("Usernames cannot contain profanity.");
      return;
    }

    // set loading to true
    loadingAction();

    // send data to server
    socket.emit("join", data);
  };

  const { socket } = useSocket("join", ({ users, user, error }) => {
    if (error) {
      chatJoinFailAction();
      setError(error);
      return;
    }

    // clear any previous errors
    setError(null);

    chatJoinSuccessAction(user);

    // load list of users from the backend
    loadUsersAction(users);
  });

  return isAuthenticated && !error ? (
    <Redirect to="/chat" />
  ) : (
    <Container>
      <Wrapper>
        <Title>
          <span role="img" aria-label="logo">
            💬 &nbsp;
          </span>
          Chat
        </Title>

        <Text>What should we call you?</Text>

        {error && <Error>{error}</Error>}

        <Form onSubmit={e => handleSubmit(e)}>
          <Input
            name="username"
            value={username}
            onChange={e => handleChange(e)}
            placeholder="Username"
            ref={input}
            autoComplete="off"
            maxLength={16}
            required
          />
          <Button type="submit">Join</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Home;
