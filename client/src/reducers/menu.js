import { TOGGLE_MENU, SET_MENU_IS_OPEN, RESET_MENU } from "../actions/types";

const intialState = {
  isOpen: false,
  shouldBeOpen: false
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isOpen: !state.isOpen,
        shouldBeOpen: !state.shouldBeOpen
      };
    case SET_MENU_IS_OPEN:
      return {
        ...state,
        isOpen: payload
      };
    case RESET_MENU:
      return {
        ...state,
        isOpen: false,
        shouldBeOpen: false
      };
    default:
      return state;
  }
}
