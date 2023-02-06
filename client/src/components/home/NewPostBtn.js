import React from "react";
import Mordki from "../Mordki";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const NewPostBtn = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="form_status my-3 d-flex">
      <Mordki src={auth.user.avatar} size="medium-avatar" />
      <button
        className="form_statusBtn flex-fill"
        onClick={() =>
          dispatch({ type: GLOBALTYPES.FORM_STATUS, payload: true })
        }
      >
        Hej {auth.user.username}, dodaj nowy post
      </button>
    </div>
  );
};

export default NewPostBtn;
