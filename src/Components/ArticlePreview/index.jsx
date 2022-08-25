import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import "./ArticlesPreview.css";

const ArticlePreview = (props) => {
  const context = useContext(UserContext);
  const user = context.user;
  const [favorited, setFavorited] = useState(props.favorited);
  const [favorCount, setFavorCount] = useState(props.favoritesCount);

  const handleClick = async () => {
    const response = !favorited
      ? await context.likeArticle(props.slug)
      : await context.dislikeArticle(props.slug);

    setFavorCount(response.data.article.favoritesCount);
    setFavorited(!favorited);
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/${props.author.username}`}>
          <img src={`${props.author.image}`} alt="" />
        </Link>
        <div className="info">
          <Link to={`/${props.author.username}`} className="author">
            {props.author.username}
          </Link>
          <span className="date">{props.createdAt}</span>
        </div>
        <Link
          to={`${!user ? "/login" : ""}`}
          className={`btn ${
            favorited ? "active" : "btn-outline-primary"
          } btn-sm pull-xs-right`}
          onClick={handleClick}
        >
          <i className="ion-heart"></i> {favorCount}
        </Link>
      </div>
      <Link to={`/article/${props.slug}`} className="preview-link">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <span>Read more...</span>
      </Link>
      {props.tagList.length > 0 && (
        <ul className="tag-list" style={{ float: "right" }}>
          {props.tagList.map((tag, index) => {
            return (
              <li
                key={index}
                className="tag-default tag-pill tag-outline ng-binding ng-scope"
              >
                {tag}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ArticlePreview;
