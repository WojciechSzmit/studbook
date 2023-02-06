import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from "../redux/actions/discoverAction";
import LoadIcon from "../images/gear.gif";
import PostMiniature from "../components/postTools/PostMiniature";
import GiveMeMoreButton from "../components/postTools/GiveMeMoreButton";
import { getDataAPI } from "../services/axiosRetrieveData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_odkrywaj?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <PostMiniature posts={discover.posts} result={discover.result} />
      )}

      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto " />
      )}

      {!discover.loading && (
        <GiveMeMoreButton
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
