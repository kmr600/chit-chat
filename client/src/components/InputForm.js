import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import { useSelector } from "react-redux";
import Filter from "bad-words";
import UIfx from "uifx";
import TextareaAutosize from "react-autosize-textarea";
import ArrowUp from "../icons/ArrowUp";
import profanityAudio from "../sounds/watch-your-profanity.mp3";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions/chat";
import {GiphyFetch} from "@giphy/js-fetch-api"

const filter = new Filter();
const giphyfetch = new GiphyFetch("DL7YFptyv83jER6bXMfwhXOg65oFo713");

// sounds
const profanity = new UIfx(profanityAudio, {
  volume: 0.4,
  throttleMs: 100
});

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Form = styled.form`
  position: relative;
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

const CharacterLimit = styled.p`
  margin-top: 12px;
  margin-bottom: 14px;
  margin-left: auto;
  display: inline-block;
  color: ${props => props.theme.subColor};
  font-size: 13px;
  word-break: break-word;
  line-height: 155%;
`;

const Input = () => {
  // set focus to textarea on load
  const textarea = useRef(null);
  useEffect(() => {
    textarea.current.focus();
  }, []);

  // Redux
  const { user } = useSelector(state => state.auth);
  const { soundNotifications } = useSelector(state => state.settings);
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

  const [typing, setTyping] = useState(false);

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

  // show to users that you're typing
  useEffect(() => {
    if (message.length > 0) {
      if (!typing) {
        setTyping(true);
        socket.emit("typing", { username: user.username });
      }
    } else {
      setTyping(false);
      socket.emit("notTyping", { username: user.username });
    }
  }, [message]);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // check if message has content
    if (!message.length) return;

    // filter out profanity
    let filteredMessage = filter.clean(message);

    // if message has profanity, play audio
    if (filter.isProfane(message) && soundNotifications) {
      profanity.play();
    }

    let payload = {
      ...data,
    }
    
    if(filteredMessage.startsWith("/giphy")) {
      // Removing the /giphy part
      const term = filteredMessage.split(" ").slice(1).join(" ")

      // Getting a gif based on the keyword/term entered
      const {data} = await giphyfetch.search(term, {limit: 1, offset: Math.floor(Math.random() * 100), rating: "pg-13"})
      const [gif] = data

      if(gif) {
        payload = {...payload, gif, type: "gif"}
        socket.emit("sendMessage", payload);
      } else {
        // Setting system message to inform the user that no gif was found
        const message = "Sorry, no matching gif found...This message is only visible to you."
        payload = {...payload, message, type: "info"}
      }

    } else {
      const message = filteredMessage
      payload = {...payload, message, type: "message"}
      socket.emit("sendMessage", payload);
    }
    // add message to chatroom
    sendMessageAction({...payload, error: false, errorMessage: ""});
    // send data to server for others to receive
    // clear input
    setData({ ...data, message: "" });
    // set focus back to text area
    textarea.current.focus();
  };

  const messageLimit = 240;

  const { socket } = useSocket("sendMessage");

  return (
    <Wrapper>
      <CharacterLimit>
        {message.length} / {messageLimit}
      </CharacterLimit>

      <Form onSubmit={e => handleSubmit(e)}>
        <TextArea
          name="message"
          value={message}
          placeholder="Say something..."
          onChange={e => handleChange(e)}
          ref={textarea}
          onKeyPress={e => e.key === "Enter" && handleSubmit(e)}
          maxLength={240}
        />

        <Button type="submit">
          <ArrowUp />
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Input;
