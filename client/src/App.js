import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* import Register from "./pages/register";
import Login from "./pages/login"; */

import PageRender from "./customRouter/PageRender";
//import { PrivateRouter } from "./customRouter/PrivateRouter"; - w nawiasach nie działało!!!!
import PrivateRouter from "./customRouter/PrivateRouter";

//strony
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import Warning from "./components/warning/Warning";
import HeaderMainBar from "./components/topNavBar/HeaderMainBar";
import PostInputModal from "./components/postTools/PostInputModal";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketConnection from "./SocketConnection";

import { getNotifies } from "./redux/actions/notifyAction";

function App() {
  const { auth, form_status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    //---START----Notyfikacje desktopowe z js API
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
        }
      });
    }
    //-------------------END------------------------------
  }, []);

  return (
    <Router>
      <Warning />
      <input type="checkbox" id="theme" />
      {/* <div className="App"> */}
      <div className={`App ${(form_status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <HeaderMainBar />}
          {form_status && <PostInputModal />}
          {auth.token && <SocketConnection />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          {/*Zabezpieczenie stron */}
          <div className="wrap_page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
