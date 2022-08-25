import axios from "axios";
import React, { useState } from "react";

const FormComment = (props) => {
  const token = localStorage.getItem('jwtToken')
  const [value, setValue] = useState("")
  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }

  const handlePostComment = (e) => {
    e.preventDefault()
    axios.post(`https://api.realworld.io/api/articles/${props.path}/comments`,
    {
      "comment" : {
        "body" : value
      }
    },
    {
      headers: {
        accept: "application/json",
        authorization: "Token " + token 
      },
    })
    .then(res => {
      setValue('')
      props.setComments((comments) => [...comments, res.data.comment])
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <form className="card comment-form">
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows="3"
            value={value}
            onChange={handleChangeValue}
          ></textarea>
        </div>
        <div className="card-footer">
          <img
            src={props.image}
            className="comment-author-img"
            alt=""
          />
          <button className="btn btn-sm btn-primary" onClick={handlePostComment}>Post Comment</button>
        </div>
      </form>
    </>
  );
};

export default FormComment;
