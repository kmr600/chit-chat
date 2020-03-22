import {
  CHAT_JOIN_SUCCESS,
  CHAT_JOIN_FAIL,
  CHAT_JOIN_LOADING,
  CHAT_LEAVE
} from "./types";

// Join chat
export const chatJoinSuccess = data => dispatch => {
  dispatch({
    type: CHAT_JOIN_SUCCESS,
    payload: data
  });
};

// Fail to join chat
export const chatJoinFail = () => dispatch => {
  dispatch({
    type: CHAT_JOIN_FAIL
  });
};

// Join chat loading
export const chatJoinLoading = () => dispatch => {
  dispatch({
    type: CHAT_JOIN_LOADING
  });
};

// Leave chat
export const chatLeave = () => dispatch => {
  dispatch({
    type: CHAT_LEAVE
  });
};
