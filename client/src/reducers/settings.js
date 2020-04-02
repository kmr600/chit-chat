import { SET_THEME, TOGGLE_SOUND_NOTIFICATIONS } from "../actions/types";

const intialState = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light",
  soundNotifications: false
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
    case TOGGLE_SOUND_NOTIFICATIONS:
      return {
        ...state,
        soundNotifications: !state.soundNotifications
      };
    default:
      return state;
  }
}
