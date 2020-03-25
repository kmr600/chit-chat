import { SET_THEME } from "./types";

// Toggle between light and dark mode
export const setTheme = theme => dispatch => {
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};
