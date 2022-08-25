import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider";

const FormAuth = () => {
  let locationPathname = useLocation().pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [errLoginNoti, setErrLoginNoti] = useState(false);

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetEmail = (e) => {
    setErrLoginNoti(false);
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setErrLoginNoti(false);
    setPassword(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const api = "https://api.realworld.io/api/users";
    context
      .sendData({
        name,
        email,
        password,
        api: locationPathname === "/login" ? api + "/login" : api,
        method: "post",
        navigate,
        path: "/",
      })
      .then((err) => {
        if (err && email !== "" && password !== "") {
          setErrLoginNoti(true);
        } else if (email !== "" || (password !== "" && err)) {
          setErrorLogin(true);
        } else {
          setErrLoginNoti(false);
          setErrorLogin(false);
        }
      });
  };

  return (
    <>
      {locationPathname === "/login" && (
        <ul className="error-messages">
          {email === "" && errorLogin && <li>Email can't be blank</li>}
          {password === "" && errorLogin && <li>Password can't be blank</li>}
          {errLoginNoti && <li>Email or password is invalid</li>}
        </ul>
      )}

      <form>
        {locationPathname === "/register" && (
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              onChange={handleSetName}
            />
          </fieldset>
        )}
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
            onChange={handleSetEmail}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            onChange={handleSetPassword}
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          onClick={handleOnSubmit}
        >
          {locationPathname === "/login" ? "Signin" : "Sign up"}
        </button>
      </form>
    </>
  );
};

export default FormAuth;
