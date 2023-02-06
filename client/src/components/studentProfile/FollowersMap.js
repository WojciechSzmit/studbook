import React from "react";
import StudentCard from "../StudentCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const FollowersMap = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Obserwatorzy</h5>
        <hr />

        <div className="follow_content">
          {users.map((user) => (
            <StudentCard
              key={user._id}
              user={user}
              setShowFollowers={setShowFollowers}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </StudentCard>
          ))}
        </div>

        <div className="close" onClick={() => setShowFollowers(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default FollowersMap;
