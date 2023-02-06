import React, { useState, useEffect } from "react";
import CommentShow from "./commentBox/CommentShow";

const CommentsContainer = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);

  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCommment = post.comments.filter((com) => !com.reply);
    setComments(newCommment);
    setShowComments(newCommment.slice(newCommment.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((com) => com.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  return (
    <div className="comments">
      {showComments.map((comment, index) => (
        <CommentShow
          //key={comment._id}
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}

      {comments.length - next > 0 ? (
        <div
          className="p-2 border-top"
          style={{ cursor: "pointer", color: "#45a948" }}
          onClick={() => setNext(next + 10)}
        >
          Zobacz pozostałe komentarze...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="p-2 border-top"
            style={{ cursor: "pointer", color: "#45a948" }}
            onClick={() => setNext(2)}
          >
            Ukryj komentarze.
          </div>
        )
      )}
    </div>
  );
};

export default CommentsContainer;
