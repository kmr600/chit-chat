import { SET_THEME, TOGGLE_SOUND_NOTIFICATIONS } from "./types";

// Toggle between light and dark mode
export const setTheme = theme => dispatch => {
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};

// Toggle sound notifications on and off for incoming messsages
export const toggleSoundNotifications = () => dispatch => {
  dispatch({
    type: TOGGLE_SOUND_NOTIFICATIONS
  });
};
