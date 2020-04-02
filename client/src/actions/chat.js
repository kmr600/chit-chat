import {
  LOAD_USERS,
  ADD_USER,
  REMOVE_USER,
  CLEAR_USERS,
  SEND_MESSAGE,
  NEW_MESSAGE,
  SET_MESSAGE_ERROR,
  ADD_USER_TO_TYPING,
  REMOVE_USER_FROM_TYPING,
  CLEAR_MESSAGES
} from "./types";

// Load updated user list from backend
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

// Clear users from state, such as when logging out
export const clearUsers = () => dispatch => {
  dispatch({
    type: CLEAR_USERS
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

// Set error to a specific message
export const setMessageError = ({ index, error }) => dispatch => {
  dispatch({
    type: SET_MESSAGE_ERROR,
    payload: { index, error }
  });
};

// Add users who are typing to the typing list
export const addUserToTyping = typing => dispatch => {
  dispatch({
    type: ADD_USER_TO_TYPING,
    payload: typing
  });
};

// Remove users who stopped typing from the typing list
export const removeUserFromTyping = typing => dispatch => {
  dispatch({
    type: REMOVE_USER_FROM_TYPING,
    payload: typing
  });
};

// Clear messages from state, such as when logging out or clicking the button in settings
export const clearMessages = () => dispatch => {
  dispatch({
    type: CLEAR_MESSAGES
  });
};
