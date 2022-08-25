import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormAuth from "../../Components/FormAuth";

const Auth = () => {
  let locationPathname = useLocation().pathname;
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              {locationPathname === "/login" ? "Signin" : "Sign up"}
            </h1>
            <p className="text-xs-center">
              {locationPathname === "/login" ? (
                <Link to="/register">Don't have an account?</Link>
              ) : (
                <Link to="/login">Have an account?</Link>
              )}
            </p>
            <FormAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
