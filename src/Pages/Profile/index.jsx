import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Feed from "../../Components/Feed";
import Loading from "../../Components/Loading";
import { UserContext } from "../../UserProvider";

const Profile = () => {
  const [yourArticles, setYourArticles] = useState(true);
  const [user, setUser] = useState("");
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [follow, setFollow] = useState()
  const pathName = useLocation().pathname;
  const token = localStorage.getItem("jwtToken");
  const context = useContext(UserContext);
  const userLogin = context.user;

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/profiles${pathName}`, {
        headers: {
          accept: "application/json",
          authorization: "Token " + (token || ""),
        },
      })
      .then((response) => {
        setUser(response.data.profile);
        setFollow(response.data.profile.following)
        setYourArticles(true)
      })
      .catch((err) => console.log(err));
  }, [pathName]);

  const handleChangeArticles = (e) => {
    if (e.target.id === "item-1") {
      setYourArticles(true);
    }
    if (e.target.id === "item-2") {
      setYourArticles(false);
    }
  };

  const getArticles = async () => {
    setIsLoading(true);
    let slug;
    yourArticles
      ? (slug = `author=${context.handleConvertName(pathName.split("/")[1])}`)
      : (slug = `favorited=${context.handleConvertName(
          pathName.split("/")[1]
        )}`);
    const res = await axios
      .get(`https://api.realworld.io/api/articles?${slug}`, {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: "Token " + (token ||""),
        },
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
    setArticles(res.data.articles);
  };

  useEffect(() => {
    getArticles();
  }, [yourArticles]);

  const handleFollow = async() => {
    if(follow){
      await axios
          .delete(
            `https://api.realworld.io/api/profiles/${user.username}/follow`,
            {
              headers: {
                accept: "application/json",
                authorization: "Token " + token,
              },
            }
          )
          .catch((err) => console.log(err));
        setFollow(!follow);
    }
    else {
      await axios
          .post(
            `https://api.realworld.io/api/profiles/${user.username}/follow`, {},
            {
              headers: {
                accept: "application/json",
                authorization: "Token " + token,
              },
            }
          )
          .catch((err) => console.log(err));
        setFollow(!follow);
    }
  }
  return (
    <>
      {user && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={user.image} className="user-img" alt="" />
                  <h4>{user.username}</h4>
                  <p>{user.bio}</p>
                  {token && userLogin.username !== user.username && (
                    <button className={`btn btn-outline-secondary action-btn btn-sm ${follow ? "active" : ""} `} onClick={handleFollow}>
                      <i className="ion-plus-round"></i>
                      &nbsp; {follow ? "Unfollow" : "Follow"} {user.username}
                    </button>
                  )}
                  {!token && <Link to="/login" className="btn btn-outline-secondary action-btn btn-sm">
                      <i className="ion-plus-round"></i>&nbsp; Follow {user.username}
                    </Link>
                  }
                  {token && userLogin.username === user.username && (
                    <Link
                      to="/settings"
                      className="btn btn-outline-secondary action-btn btn-sm"
                    >
                      <i className="ion-plus-round"></i>
                      &nbsp; Update profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${yourArticles ? "active" : ""}`}
                        to=""
                        id="item-1"
                        onClick={handleChangeArticles}
                      >
                        My Articles
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${!yourArticles ? "active" : ""}`}
                        to=""
                        id="item-2"
                        onClick={handleChangeArticles}
                      >
                        Favorite Articles
                      </Link>
                    </li>
                  </ul>
                </div>
                {isLoading && <Loading />}
                {!isLoading && <Feed articles={articles} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
