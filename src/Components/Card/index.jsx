import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const token = localStorage.getItem('jwtToken')

  const deleteComment = async () => {
    await axios.delete(`https://api.realworld.io/api/articles/${props.slug}/comments/${props.id}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: "Token " + token
      }
    })
    .then(res => {
      props.setComments((comments) => {
      const commentRemove = comments[props.index]
      return comments.filter(comment => comment !== commentRemove)
      }
    )})
    .catch(err => console.log(err))
  }

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">
          {props.body}
        </p>
      </div>
      <div className="card-footer">
        <Link to={`/${props.pathName}`} className="comment-author">
          <img src={props.image} className="comment-author-img" alt="" />
        </Link>
        &nbsp;
        <Link to={`/${props.pathName}`} className="comment-author">
          {props.name}
        </Link>
        <span className="date-posted">{props.updatedAt}</span>
        {props.name === props.userLogin && <span className="mod-options">
          <i className="ion-trash-a"  onClick={deleteComment}></i>
        </span>}
      </div>
    </div>
  );
};

export default Card;
