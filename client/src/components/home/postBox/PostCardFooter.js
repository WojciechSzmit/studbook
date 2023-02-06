import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LikeBtn from "../../postTools/LikeBtn";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import SharePost from "../../postTools/SharePost";
import { BASE_URL } from "../../../services/urlSetup";

const PostCardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  //ustawienie stanu do zakładek
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  //Polubienia
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  //console.log(isLike);
  const handleLike = async () => {
    if (loadLike) return;
    //setIsLike(true);

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    // setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  //Zapisane posty
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;
    //setIsLike(true);

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };
  const handleUnSavePost = async () => {
    if (saveLoad) return;
    // setIsLike(false);
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <i
            className="fa-solid fa-bullhorn"
            onClick={() => setIsShare(!isShare)}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="fa-sharp fa-solid fa-comments" />
          </Link>

          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          {saved ? (
            <i
              className="fa-sharp fa-solid fa-book-bookmark text-success"
              onClick={handleUnSavePost}
            />
          ) : (
            <i
              className="fa-sharp fa-solid fa-book-bookmark"
              onClick={handleSavePost}
            />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between ">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} komentarzy
        </h6>

        <h6 style={{ padding: "0 60px", cursor: "pointer" }}>
          {post.likes.length} polubień
        </h6>
      </div>

      {isShare && (
        <SharePost url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default PostCardFooter;
