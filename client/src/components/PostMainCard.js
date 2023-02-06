import React from "react";
import PostCardHeader from "./home/postBox/PostCardHeader";
import PostCardBody from "./home/postBox/PostCardBody";
import PostCardFooter from "./home/postBox/PostCardFooter";

import CommentsContainer from "./home/CommentsContainer";
import CommentInput from "./home/CommentInput";

const PostMainCard = ({ post, theme }) => {
  return (
    <div className="card my-3" style={{ borderColor: "#45a948" }}>
      <PostCardHeader post={post} />
      <PostCardBody post={post} theme={theme} />
      <PostCardFooter post={post} />
      <CommentsContainer post={post} />
      <CommentInput post={post} />
    </div>
  );
};

export default PostMainCard;
