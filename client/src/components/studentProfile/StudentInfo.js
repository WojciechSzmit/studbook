import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
import Mordki from "../Mordki";
//import { getProfileUsers } from "../../redux/actions/profileAction";
import ProfileModify from "./ProfileModify";
import FollowBtn from "../FollowBtn";
import FollowersMap from "./FollowersMap";
import FollowingMap from "./FollowingMap";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const StudentInfo = ({ id, auth, profile, dispatch }) => {
  //console.log(useParams());
  //const { id } = useParams();
  //const { auth, profile } = useSelector((state) => state);
  //const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      //setUserData([]);

      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <div className="info_content">
            <div className="info_content_title">
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-success"
                  onClick={() => setOnEdit(true)}
                >
                  Edytuj profil
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <p></p>
            <div className="follow_btn">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Obserwatorzy
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user.following.length} Obserwowani
              </span>
            </div>
            <h6>
              {user.fullname}{" "}
              <span className="text-success">{user.mobile}</span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href="{user.website}" target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          <h2>{user.username}</h2>
          <Mordki src={user.avatar} size="super-avatar" />

          {/* segment do edycji użytkownika */}
          {onEdit && <ProfileModify setOnEdit={setOnEdit} />}
          {showFollowers && (
            <FollowersMap
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <FollowingMap
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentInfo;
