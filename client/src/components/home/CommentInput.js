import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import Emoji from "../postTools/Emoji";

const CommentInput = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    //console.log(newComment);

    //console.log(newComment);
    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Skomentuj to..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
          background: theme ? "rgba(0,0,0,.03)" : "",
        }}
      />
      <Emoji setContent={setContent} content={content} theme={theme} />
      <button type="submit" className="postBtn">
        Zatwierdź
      </button>
    </form>
  );
};

export default CommentInput;
