import {
  LOAD_USERS,
  ADD_USER,
  REMOVE_USER,
  CLEAR_USERS,
  SEND_MESSAGE,
  NEW_MESSAGE,
  SET_MESSAGE_ERROR,
  CLEAR_MESSAGES
} from "../actions/types";

const intialState = {
  messages: [],
  users: [],
  loading: false,
  error: false
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        users: payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, payload]
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user !== payload)
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      };
    case SEND_MESSAGE:
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        error: false,
        loading: false
      };
    case SET_MESSAGE_ERROR:
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, payload.index), // everything before current message
          {
            ...state.messages[payload.index],
            error: true,
            errorMessage: payload.error
          },
          ...state.messages.slice(payload.index + 1) // everything after current message
        ],
        error: false,
        loading: false
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
}
