import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserProvider";
import { useNavigate } from "react-router-dom";

const FormSetting = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const user = context.user;

  const [image, setImage] = useState(user.image);
  const [username, setUserName] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setImage(user.image);
    setUserName(user.username);
    setBio(user.bio);
    setEmail(user.email);
  }, [user]);

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "") {
      console.log("error");
      return;
    }

    context
      .sendData({
        api: "https://api.realworld.io/api/user",
        method: "put",
        image,
        name: username,
        bio,
        email,
        password,
        navigate,
        path: `/${user.username}`,
        token: user.token,
      })
      .then((err) => console.log(err));
  };

  return (
    <>
      {user && (
        <form>
          <fieldset>
            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="URL of profile picture"
                onChange={handleImage}
                value={image || ""}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                onChange={handleUserName}
                value={username || ""}
              />
            </fieldset>
            <fieldset className="form-group">
              <textarea
                className="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                onChange={handleBio}
                value={bio || ""}
              ></textarea>
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                onChange={handleEmail}
                value={email || ""}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="New password"
                onChange={handlePassword}
                value={password || ""}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              onClick={handleSubmit}
            >
              Update Settings
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default FormSetting;
