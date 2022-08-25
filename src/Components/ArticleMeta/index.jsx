import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider";

const ArticleMeta = (props) => {
  const context = useContext(UserContext);
  const user = context.user;
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const deleteArticles = async () => {
    await axios
      .delete(`https://api.realworld.io/api/articles/${props.slug}`, {
        headers: {
          accept: "application/json",
          authorization: "Token " + token,
        },
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  const handleClick = async () => {
    if(token) {
      if (props.favorite) {
        await axios
          .delete(
            `https://api.realworld.io/api/articles/${props.slug}/favorite`,
            {
              headers: {
                accept: "application/json",
                authorization: "Token " + token,
              },
            }
          )
          .catch((err) => console.log(err));
        props.setFavorite(!props.favorite);
      } else {
        await axios
          .post(
            `https://api.realworld.io/api/articles/${props.slug}/favorite`,
            {},
            {
              headers: {
                accept: "application/json",
                authorization: "Token " + token,
              },
            }
          )
          .catch((err) => console.log(err));
        props.setFavorite(!props.favorite);
      }
    }
  };

  const handleFollow = async () => {
    if(token && user.username !== props.name){
      if (props.follow) {
        await axios
          .delete(`https://api.realworld.io/api/profiles/${props.name}/follow`, {
            headers: {
              accept: "application/json",
              authorization: "Token " + token,
            },
          })
          .catch((err) => console.log(err));
        props.setFollow(!props.follow);
      } else {
        await axios
          .post(
            `https://api.realworld.io/api/profiles/${props.name}/follow`,
            {},
            {
              headers: {
                accept: "application/json",
                authorization: "Token " + token,
              },
            }
          )
          .catch((err) => console.log(err));
        props.setFollow(!props.follow);
      }
    }
  };
  
  return (
    <div className="article-meta">
      <Link to={`/${props.pathName}`}>
        <img src={props.image} alt="" />
      </Link>

      <div className="info">
        <Link to={`/${props.pathName}`} className="author">
          {props.name}
        </Link>
        <span className="date">{props.date}</span>
      </div>

      {token && <Link to={`${user.username === props.name ? `/editor/${props.slug}` : ""}`}
        className={`btn btn-sm btn-outline-primary ${props.follow ? "active" : ""}`}
        onClick={handleFollow}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {`${
          user.username === props.name ? "Edit article" : `${props.follow ? "Unfollow" : "Follow"} ${props.name}`
        }`}
      </Link>}

      {!token && <Link to = {!user ? "/login" : ""} className="btn btn-sm btn-outline-primary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {props.name}
      </Link>}

      &nbsp;&nbsp;
      {user.username !== props.name ? (
        <Link
          to={`${!user.username ? "/login" : ""}`}
          className={`btn btn-sm btn-outline-secondary ${
            props.favorite ? "active" : ""
          }`}
          onClick={handleClick}
        >
          <i className="ion-heart"></i>
          &nbsp; {props.favorite ? "Unfavorite" : "Favorite"} Post
        </Link>
      ) : (
        <button
          className="btn btn-sm delete btn-outline-secondary"
          onClick={deleteArticles}
        >
          <i className="ion-trash-a"></i>
          &nbsp; Delete article
        </button>
      )}
    </div>
  );
};

export default ArticleMeta;
