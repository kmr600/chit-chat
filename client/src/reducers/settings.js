import { SET_THEME } from "../actions/types";

const intialState = {
  theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_THEME:
      localStorage.setItem("theme", payload);

      return {
        ...state,
        theme: payload
      };
    default:
      return state;
  }
}
