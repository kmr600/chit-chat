import {
  LOAD_USERS,
  ADD_USER,
  REMOVE_USER,
  SEND_MESSAGE,
  NEW_MESSAGE
} from "./types";

export const loadUsers = users => dispatch => {
  dispatch({
    type: LOAD_USERS,
    payload: users.map(user => user.username)
  });
};

// Add user to user list when joining chat
export const addUser = username => dispatch => {
  dispatch({
    type: ADD_USER,
    payload: username
  });
};

// Remove user to user list when leaving chat
export const removeUser = username => dispatch => {
  dispatch({
    type: REMOVE_USER,
    payload: username
  });
};

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
