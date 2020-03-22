import { SEND_MESSAGE, NEW_MESSAGE } from "../actions/types";

const intialState = {
  messages: [],
  loading: false,
  error: false
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_MESSAGE:
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        error: false,
        loading: false
      };
    default:
      return state;
  }
}
