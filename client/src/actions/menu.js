import { TOGGLE_MENU, SET_MENU_IS_OPEN, RESET_MENU } from "./types";

// Toggle menu visiblity in chatroom
export const toggleMenu = () => dispatch => {
  dispatch({
    type: TOGGLE_MENU
  });
};

// Determine if menu is open
export const setMenuIsOpen = isOpen => dispatch => {
  dispatch({
    type: SET_MENU_IS_OPEN,
    payload: isOpen
  });
};

// Reset menu to being closed, such as when logging out
export const resetMenu = () => dispatch => {
  dispatch({
    type: RESET_MENU
  });
};
