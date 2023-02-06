import React from "react";
import AdvBanner from "../../images/AdvBanner.jpg";

const CommercialBox = () => {
  return (
    <div>
      <hr color="#45a948"></hr>
      <a href="https://ansl.edu.pl">
        <img src={AdvBanner} className="img-fluid" alt="Advbanner" />
      </a>
      <hr color="#45a948"></hr>
    </div>
  );
};

export default CommercialBox;
