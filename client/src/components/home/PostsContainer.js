import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostMainCard from "../PostMainCard";

import LoadIcon from "../../images/gear.gif";
import GiveMeMoreButton from "../postTools/GiveMeMoreButton";
import { getDataAPI } from "../../services/axiosRetrieveData";
import { POST_TYPES } from "../../redux/actions/postAction";

const PostsContainer = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );

    // console.log(res);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostMainCard key={post._id} post={post} theme={theme} />
      ))}

      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto " />
      )}

      <GiveMeMoreButton
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default PostsContainer;
