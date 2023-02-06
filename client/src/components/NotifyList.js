import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NullNotice from "../images/szczekaczka.png";
import { Link } from "react-router-dom";
import Mordki from "./Mordki";
import moment from "moment";
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies,
} from "../redux/actions/notifyAction";

const NotifyList = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));
    if (
      window.confirm(
        `Masz ${newArr.length} nieprzeczytanych wiadomości. Czy jesteś pewien, że chcesz je usunąć?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div style={{ minWidth: "280px" }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Powiadomienia</h3>
        {notify.sound ? (
          <i
            className="fas fa-bell text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={handleSound}
          />
        )}
      </div>
      <hr className="mt-0" />
      {notify.data.length === 0 && (
        <img src={NullNotice} alt="NoNotice" className="w-100" />
      )}

      <div style={{ maxHeight: "calc(100vh -200px", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              {/* <Avatar src={msg.image} size="big-avatar" /> */}
              <Mordki src={msg.user.avatar} size="big-avatar" />
              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              <div style={{ width: "30px" }}>
                {msg.image && <Mordki src={msg.image} size="medium-avatar" />}
              </div>
            </Link>
            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle text-primary" />}
            </small>
          </div>
        ))}
      </div>

      <hr className="my-1" />
      <div
        className="text-right text-danger mr-2"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteAll}
      >
        Skasuj wszystkie
      </div>
    </div>
  );
};

export default NotifyList;
