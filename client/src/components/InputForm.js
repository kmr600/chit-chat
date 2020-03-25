import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import { useSelector } from "react-redux";
import Filter from "bad-words";
import TextareaAutosize from "react-autosize-textarea";
import ArrowUp from "../icons/ArrowUp";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions/chat";

const filter = new Filter();

const Form = styled.form`
  position: relative;
  margin-top: 28px;
  width: 100%;
  display: block;
  padding: 12px 18px;
  background-color: ${props => props.theme.secondaryBgColor};
  box-shadow: 0px 3px 10px rgba(68, 68, 68, 0.08);
  border-radius: 16px;
`;

const TextArea = styled(TextareaAutosize)`
  /* this padding will keep send button from covering up the text area */
  padding-right: 42px;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.color};
  font-family: ${props => props.theme.font};
  font-size: 15px;
  line-height: 155%;
  resize: none;
  &::placeholder {
    color: ${props => props.theme.color}4D;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: ${props => props.theme.purple};
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  svg {
    stroke: #fff;
  }
`;

const Input = () => {
  // set focus to textarea on load
  const textarea = useRef(null);
  useEffect(() => {
    textarea.current.focus();
  }, []);

  // Redux
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const sendMessageAction = useCallback(
    payload => {
      dispatch(sendMessage(payload));
    },
    [dispatch]
  );

  const [data, setData] = useState({
    username: "",
    message: ""
  });

  // set username of outgoing message to logged in username
  useEffect(() => {
    if (user) {
      setData({
        ...data,
        username: user.username
      });
    }
  }, [user]);

  const { message } = data;

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // check if message has content
    if (!message.length) return;

    // filter out profanity
    const filteredMessage = filter.clean(message);

    // add message to chatroom
    sendMessageAction({ ...data, message: filteredMessage });
    // send data to server for others to receive
    socket.emit("sendMessage", { ...data, message: filteredMessage });
    // clear input
    setData({ ...data, message: "" });
    // set focus back to text area
    textarea.current.focus();
  };

  const { socket } = useSocket("sendMessage");

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <TextArea
        name="message"
        value={message}
        placeholder="Say something..."
        onChange={e => handleChange(e)}
        ref={textarea}
        onKeyPress={e => e.key === "Enter" && handleSubmit(e)}
      />

      <Button type="submit">
        <ArrowUp />
      </Button>
    </Form>
  );
};

export default Input;
