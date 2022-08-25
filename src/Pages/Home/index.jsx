import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Feed from "../../Components/Feed";
import Loading from "../../Components/Loading";
import PopularTags from "../../Components/PopularTags";
import { UserContext } from "../../UserProvider";

const Home = () => {
  const context = useContext(UserContext);
  const user = context.user;
  const token = localStorage.getItem("jwtToken");
  const [tagActive, setTagActive] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [feedActive, setFeedActive] = useState(token ? "/feed" : "/");

  const handleClick = (e) => {
    document.querySelector(".feed-label.active").classList.remove("active");
    if (e.target.id === "item-1") {
      setFeedActive("/feed");
      e.target.classList.add("active");
    } else if (e.target.id === "item-2") {
      setFeedActive("/");
      e.target.classList.add("active");
    } else if (e.target.id === "item-3") {
      setFeedActive(`?&tag=${tagActive}`);
      e.target.classList.add("active");
    }
  };

  const getData = async (slug) => {
    setIsLoading(true);
    await axios
      .get(`https://api.realworld.io/api/articles${slug}`, {
        headers: {
          accept: "application/json",
          authorization: "Token " + (token || ""),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setArticles(res.data.articles);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(feedActive);
  }, [feedActive]);

  return (
    <div className="home-page">
      {!user && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {user && (
                  <li
                    className={`nav-item nav-link feed-label ${
                      token ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    id="item-1"
                    onClick={handleClick}
                  >
                    Your Feed
                  </li>
                )}
                <li
                  className={`nav-item nav-link feed-label ${
                    token ? "" : "active"
                  }`}
                  style={{ cursor: "pointer" }}
                  id="item-2"
                  onClick={handleClick}
                >
                  Global Feed
                </li>

                <li
                  className="nav-item nav-link feed-label"
                  style={{ cursor: "pointer" }}
                  id="item-3"
                  onClick={handleClick}
                >
                  {feedActive === `?&tag=${tagActive}` && (
                    <>
                      <i className="ion-pound"></i> {`${tagActive}`}
                    </>
                  )}
                </li>
              </ul>
            </div>
            {isLoading && <Loading />}
            {!isLoading && <Feed articles={articles} isLoading={isLoading} />}
          </div>

          <PopularTags
            setTagActive={setTagActive}
            setFeedActive={setFeedActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
