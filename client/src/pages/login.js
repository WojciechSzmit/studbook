import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

import LoadIcon from "../images/icon.svg";
import videoBg from "../images/vbg.mp4";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    //if (auth.token) history.push("/");
    if (auth.token) history("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <video src={videoBg} autoPlay loop muted />
      <div className="content">
        <form onSubmit={handleSubmit}>
          <img src={LoadIcon} className="img-fluid" alt="Responsive image" />
          <h3 className="text-uppercase text-center mb-4">studbook</h3>
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
            />
            <small id="emailHelp" className="form-text text-muted">
              Twoje dane są dostępne tylko dla nas.
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
              />
              <small onClick={() => setTypePass(!typePass)}>
                {typePass ? "Ukryj" : "Pokaż"}
              </small>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={email && password ? false : true}
          >
            Zaloguj
          </button>

          <p className="my-2">
            Nie posiadasz konta?{" "}
            <Link to="/register" style={{ color: "green" }}>
              Zarejestruj się
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
