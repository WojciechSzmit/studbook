import React, { useState, useEffect } from "react";
import CommentPanel from "./CommentPanel";

const CommentShow = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentPanel comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {/* spacing padding left odp na komentarz nie działa */}
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentPanel
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              style={{ cursor: "pointer", color: "crimson" }}
              onClick={() => setNext(next + 10)}
            >
              Zobacz pozostałe komentarze...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                style={{ cursor: "pointer", color: "crimson" }}
                onClick={() => setNext(1)}
              >
                Ukryj komentarze.
              </div>
            )
          )}
        </div>
      </CommentPanel>
    </div>
  );
};

export default CommentShow;
