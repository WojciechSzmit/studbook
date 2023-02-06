import React from "react";
import { useSelector } from "react-redux";

const LikeBtn = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);

  return (
    <>
      {isLike ? (
        <i
          className="fa-solid fa-face-grin-hearts text-danger"
          onClick={handleUnLike}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
      ) : (
        <i className="fa-solid fa-face-grin-hearts" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeBtn;
