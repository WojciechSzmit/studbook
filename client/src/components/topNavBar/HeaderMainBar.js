import React from "react";
import { Link } from "react-router-dom";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import HeaderSearch from "./HeaderSearch";
import LoadIcon from "../../images/sb.svg";
import StudentCard from "../StudentCard";
import { useSelector } from "react-redux";

const HeaderMainBar = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <HeaderDropdownMenu />
        <HeaderSearch />
        <Link to="/" className="logo">
          <h1
            className="navbar-brand text-uppercase p-0 m-0" //powrót do home top klikem w logo
            onClick={() =>
              window.scrollTo({
                top: 0,
              })
            }
          >
            <div className="sb">
              <img
                src={LoadIcon}
                className="img-fluid"
                alt="Responsive image"
              />
            </div>
          </h1>
        </Link>
      </nav>
    </div>
  );
};

export default HeaderMainBar;
