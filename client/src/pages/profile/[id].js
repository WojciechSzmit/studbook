import React, { useEffect, useState } from "react";
import StudentInfo from "../../components/studentProfile/StudentInfo";
import StudentPosts from "../../components/studentProfile/StudentPosts";
import SavedPosts from "../../components/studentProfile/SavedPosts";

import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/gear.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";

import Posty from "../../images/post.png";
import Save from "../../images/save.png";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className="profile">
      <StudentInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            <img src={Posty} className="img-fluid" alt="Posty" />
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            <img src={Save} className="img-fluid" alt="Zapisane" />
          </button>
        </div>
      )}

      {/* Ładowanie gifu lub informacji u userze */}
      {profile.loading ? (
        <img
          className="d-block mx-auto my-4"
          src={LoadIcon}
          alt="wczytywanie"
        />
      ) : (
        <>
          {saveTab ? (
            <SavedPosts auth={auth} dispatch={dispatch} />
          ) : (
            <StudentPosts
              auth={auth}
              profile={profile}
              dispatch={dispatch}
              id={id}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
