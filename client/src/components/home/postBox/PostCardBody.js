import React, { useState } from "react";
import Slideshow from "../../postTools/Slideshow";

const PostCardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      >
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ""
            : post.content.slice(0, 60) + "..."}
        </span>
        {post.content.length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? " Ukryj zawartość" : "Czytaj więcej"}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Slideshow images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default PostCardBody;
