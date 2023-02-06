import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import form_status from "./formStatusReducer";
import homePosts from "./postReducer";
import modal from "./modalReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestions from "./suggestionsReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messageReducer";
import online from "./onlineReducer";

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  form_status,
  homePosts,
  modal,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message,
  online,
});
