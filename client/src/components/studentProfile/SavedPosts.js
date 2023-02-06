import React, { useState, useEffect } from "react";
import PostMiniature from "../postTools/PostMiniature";
import LoadIcon from "../../images/gear.gif";
import GiveMeMoreButton from "../postTools/GiveMeMoreButton";
import { getDataAPI } from "../../services/axiosRetrieveData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const SavedPosts = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((error) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      });
    /*Rozwiązanie na szybkie klikanie :-) :   react_devtools_backend.js:4012 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. */
    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    /*     const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData }); */
    //console.log(res);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostMiniature posts={savePosts} result={result} />

      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto " />
      )}

      <GiveMeMoreButton
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default SavedPosts;
