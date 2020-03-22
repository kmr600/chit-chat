import {
  CHAT_JOIN_SUCCESS,
  CHAT_JOIN_FAIL,
  CHAT_JOIN_LOADING,
  CHAT_LEAVE
} from "../actions/types";

const intialState = {
  isAuthenticated: null,
  loading: false,
  user: null
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHAT_JOIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case CHAT_JOIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CHAT_JOIN_FAIL:
    case CHAT_LEAVE:
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
