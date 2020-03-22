import { SEND_MESSAGE, NEW_MESSAGE } from "./types";

// Add message to only to the sender's chatroom
export const sendMessage = data => dispatch => {
  dispatch({
    type: SEND_MESSAGE,
    payload: data
  });
};

// New message to server
export const newMessage = data => dispatch => {
  dispatch({
    type: NEW_MESSAGE,
    payload: data
  });
};
