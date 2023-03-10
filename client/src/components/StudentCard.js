import React from "react";
import Morkdi from "./Mordki";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useSelector((state) => state);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`} /* brak backslasha przed profile powodował, że string adresu dublował profile */
          onClick={handleCloseAll}
          className="d-flex align-items-center"
        >
          <Morkdi src={user.avatar} size="big-avatar" />
          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>

            <small style={{ opacity: 0.5 }}>
              {msg ? (
                <>
                  <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                    {user.text}
                  </div>
                  {user.media.length > 0 && (
                    <div>
                      {user.media.length}
                      <i className="fas fa-image" />
                    </div>
                  )}
                </>
              ) : (
                user.fullname
              )}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default StudentCard;
