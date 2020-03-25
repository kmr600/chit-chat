import { combineReducers } from "redux";
import auth from "./auth";
import chat from "./chat";
import menu from "./menu";
import settings from "./settings";

export default combineReducers({
  auth,
  chat,
  menu,
  settings
});
