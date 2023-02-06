import React from "react";
import Univeristy from "../../images/pwsip.png";
import Department from "../../images/wnit2023.svg";

const UniveristyBox = () => {
  return (
    <div>
      <hr color="#45a948"></hr>
      <a href="https://ansl.edu.pl">
        <img src={Univeristy} className="img-fluid" alt="Advbanner" />
      </a>
      <p></p>
      <a href="https://ansl.edu.pl/wnit/">
        <img src={Department} className="img-fluid" alt="Advbanner" />
      </a>
      <p></p>
      <div className="uni">
        Praca inżynierska: Projekt i implementacja studenckiej aplikacji
        społecznościowej
      </div>
      <hr color="#45a948"></hr>
    </div>
  );
};

export default UniveristyBox;
