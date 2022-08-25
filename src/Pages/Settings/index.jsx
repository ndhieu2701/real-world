import React, { useContext } from "react";
import { UserContext } from "../../UserProvider";
import { useNavigate } from "react-router-dom";
import FormSetting from "../../Components/FormSettings";

const Setting = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext)
  const user = context.user

  const logOut = () => {
    localStorage.removeItem('jwtToken')
    context.setUser(null)
    navigate('/')
  }

  return (
    <>
    {user && <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <FormSetting />
            <button
              className="btn btn-outline-danger"
              onClick={logOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Setting;
