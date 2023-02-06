import React from "react";
import StudentCard from "../StudentCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const FollowingMap = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Obserwowani</h5>
        <hr />

        <div className="follow_content">
          {users.map((user) => (
            <StudentCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </StudentCard>
          ))}
        </div>

        <div className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default FollowingMap;
