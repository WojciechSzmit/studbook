import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESS_TYPES } from "./redux/actions/messageAction";
import soundbell from "./sound/notisound.mp3";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };

  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};

const SocketConnection = () => {
  const { auth, socket, notify, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();

  //joinUser
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  //Polubienia
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      //console.log(newPost);
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      //console.log(newPost);
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  //Komentarze
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      //console.log(newPost);
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  //kasowanie komentarzy
  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      //console.log(newPost);
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  //Śledzenie
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  //notyfikacje
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: msg,
      });
      if (notify.sound) audioRef.current.play();
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "STUDBOOK"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch, notify.sound]);

  //remove notification
  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({
        type: NOTIFY_TYPES.REMOVE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  //Komunikator
  useEffect(() => {
    socket.on("addMessageToSocketConnection", (msg) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: { ...msg.user, text: msg.text, media: msg.media },
      });
    });

    return () => socket.off("addMessageToSocketConnection");
  }, [socket, dispatch]);

  //Online/offline oto jest pytanie
  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Sprawdzanie czy user offline

  useEffect(() => {
    socket.on("CheckUserOffline", (id) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={soundbell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketConnection;
