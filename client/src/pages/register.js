import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

import LoadIcon from "../images/icon.svg";
import videoBg from "../images/vbg.mp4";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, confirm_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeConfirmPass, setTypeConfirmPass] = useState(false);

  useEffect(() => {
    //if (auth.token) history.push("/");
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <video src={videoBg} autoPlay loop muted />
      <form onSubmit={handleSubmit}>
        <img src={LoadIcon} className="img-fluid" alt="Responsive image" />
        <h3 className="text-uppercase text-center mb-4">studbook</h3>

        <div className="form-group">
          <label htmlFor="username">Nazwa</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Adres email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />
          <small id="emailHelp" className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Imię i nazwisko</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
            value={fullname}
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Hasło</label>
          <div className="pass">
            <input
              type={typePass ? "test" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Ukryj" : "Pokaż"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password">Powtórz hasło</label>
          <div className="pass">
            <input
              type={typeConfirmPass ? "text" : "password"}
              className="form-control"
              id="confirm_password"
              onChange={handleChangeInput}
              value={confirm_password}
              name="confirm_password"
              style={{
                background: `${alert.confirm_password ? "#fd2d6a14" : ""}`,
              }}
            />
            <small onClick={() => setTypeConfirmPass(!typeConfirmPass)}>
              {typeConfirmPass ? "Ukryj" : "Pokaż"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.confirm_password ? alert.confirm_password : ""}
          </small>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Mężczyzna:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="female">
            Kobieta:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Rejestruj się
        </button>

        <p className="my-2">
          Posiadasz już konto?{" "}
          <Link to="/" style={{ color: "green" }}>
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
