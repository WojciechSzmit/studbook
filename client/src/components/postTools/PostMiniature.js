import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostMiniature = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0)
    return <h2 className="text-center text-danger">Postów brak</h2>;

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            {post.images[0].url.match(/video/i) ? (
              <video
                controls
                src={post.images[0].url}
                alt={post.images[0].url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            ) : post.images[0].url.match(/pdf/i) ? (
              <div className="embed-responsive embed-responsive-4by3">
                <iframe
                  src={post.images[0].url}
                  title={post.images[0].url}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              </div>
            ) : (
              <img
                src={post.images[0].url}
                alt={post.images[0].url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            )}

            <div className="post_thumb_menu">
              <i className="fa-solid fa-face-grin-hearts">
                {post.likes.length}
              </i>
              <i className="fa-sharp fa-solid fa-comments">
                {post.comments.length}
              </i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostMiniature;
