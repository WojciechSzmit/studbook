import React from "react";

import PostsContainer from "../components/home/PostsContainer";
import LeftSideBar from "../components/home/LeftSideBar";

import { useSelector } from "react-redux";
import LoadIcon from "../images/gear.gif";

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-4">
        <LeftSideBar />
      </div>
      <div className="col-md-8">
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.length === 0 ? (
          <h2 className="text-center">Brak postów</h2>
        ) : (
          <PostsContainer />
        )}
      </div>
    </div>
  );
};

export default Home;
