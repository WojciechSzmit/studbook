import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentCard from "../StudentCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/gear.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import CommercialBox from "../leftSideAdBoxes/CommercialBox";
import UniveristyBox from "../leftSideAdBoxes/UniveristyBox";

import NewPostBtn from "../home/NewPostBtn";

const LeftSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="mt-3">
      <NewPostBtn />

      <CommercialBox />

      <div>
        <h5 className="text-success" style={{ opacity: 0.5 }}>
          Twoi potencjalni znajomi:
        </h5>
      </div>
      <div className="d-flex justify-content-between align-items-center my-">
        {!suggestions.loading && (
          <i
            className="fa-solid fa-dice fa-3x"
            style={{
              cursor: "pointer",
            }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <StudentCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </StudentCard>
          ))}
        </div>
      )}

      <div
        style={{
          opacity: 0.5,
        }}
        className="my-2"
      ></div>

      <UniveristyBox />
    </div>
  );
};

export default LeftSideBar;
