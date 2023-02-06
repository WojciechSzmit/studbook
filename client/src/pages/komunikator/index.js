import React from "react";
import RightSideMessage from "../../components/gadugadu/RightSideMessage";
import LoadIcon from "../../images/msiconws.png";

const Message = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-8 px-0">
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <img src={LoadIcon} className="img-fluid" alt="Responsive image" />
          <h4>Komunikator</h4>
        </div>
      </div>

      <div className="col-md-4 border-right px-0">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Message;
