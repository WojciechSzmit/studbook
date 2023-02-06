import React, {
  useState /* A React hook that is triggered when the component is mounted. */,
  useEffect,
} from "react";
import Mordki from "../../Mordki";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeBtn from "../../postTools/LikeBtn";
import { useSelector, useDispatch } from "react-redux";
import CommentDropdownMenu from "./CommentDropdownMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";

import CommentInput from "../CommentInput";

const CommentPanel = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    //console.log(comment);
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Mordki src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}
        >
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 40
                  ? content
                  : readMore
                  ? content + ""
                  : content.slice(0, 40) + "...."}
              </span>
              {content.length > 40 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? " Ukryj zawartość" : " Czytaj więcej"}
                </span>
              )}
            </div>
          )}

          {/* xxxxxxxxxxxxxx */}

          <div style={{ cursor: "pointer" }}>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="font-weight-bold mr-3">
              {comment.likes.length} polubienia
            </small>

            {onEdit ? (
              <>
                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                  aktualizuj
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  zrezygnuj
                </small>
              </>
            ) : (
              <small className="font-weight-bold mr-3" onClick={handleReply}>
                {onReply ? "zrezygnuj" : "odpowiedz"}
              </small>
            )}
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: "pointer" }}
        >
          <CommentDropdownMenu
            post={post}
            comment={comment}
            setOnEdit={setOnEdit}
          />
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <CommentInput post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.username}:
          </Link>
        </CommentInput>
      )}

      {children}
    </div>
  );
};

export default CommentPanel;
