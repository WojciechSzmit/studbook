import React from "react";
import Mordki from "../../Mordki";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../services/urlSetup";

const PostCardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.FORM_STATUS,
      payload: { ...post, onEdit: true },
    });
  };

  const handleDeletePost = () => {
    if (window.confirm("Czy na pewno chcesz skasować tą wiadomość?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          expand_circle_down
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edytuj wpis
              </div>

              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_forever</span> Usuń wpis
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Kopiuj link
          </div>
        </div>
      </div>

      <div className="d-flex">
        <Mordki src={post.user.avatar} size="big-avatar" />

        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PostCardHeader;
