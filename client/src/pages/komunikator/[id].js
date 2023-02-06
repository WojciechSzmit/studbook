import React from "react";
import RightSideMessage from "../../components/gadugadu/RightSideMessage";
import LeftSideMessage from "../../components/gadugadu/LeftSideMessage";

const Conversation = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-8 px-0">
        <LeftSideMessage />
      </div>

      <div className="col-md-4 border-right px-0">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Conversation;
