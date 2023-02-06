import React from "react";
import Mordki from "../Mordki";
import { imageShow, videoShow } from "../../services/multimediaDisplay";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";

const MessageDisplay = ({ user, msg, theme, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (data) {
      if (window.confirm("Czy na pewno chcesz skasować?")) {
        dispatch(
          deleteMessages({
            msg,
            data,
            auth,
          })
        );
      }
    }
  };

  return (
    <>
      <div className="chat_title">
        <Mordki src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="your_content">
        {user._id === auth.user._id && (
          <i className="fa-solid fa-trash " onClick={handleDeleteMessages} />
        )}

        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
              }}
            >
              {msg.text}
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MessageDisplay;
