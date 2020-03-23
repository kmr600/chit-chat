import { combineReducers } from "redux";
import auth from "./auth";
import chat from "./chat";
import menu from "./menu";

export default combineReducers({
  auth,
  chat,
  menu
});
