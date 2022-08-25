import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import Card from "../../Components/Card";
import FormComment from "../../Components/FormComment";
import ArticleMeta from "../../Components/ArticleMeta";

const Article = () => {
  const context = useContext(UserContext);
  const user = context.user;
  const token = localStorage.getItem("jwtToken");
  const path = useLocation().pathname.split("/")[2];
  const [article, setArticle] = useState("");
  const [comments, setComments] = useState([]);
  const [favorite, setFavorite] = useState();
  const [follow, setFollow] = useState()

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/articles/${path}`, {
        headers: {
          accept: "application/json",
          authorization: "Token " + (token || ""),
        },
      })
      .then((res) => {
        setFollow(res.data.article.author.following)
        setArticle(res.data.article);
        setFavorite(res.data.article.favorited);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/articles/${path}/comments`, {
        headers: {
          accept: "application/json",
          authorization: "Token " + (token || ""),
        },
      })
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{context.convertSlug(article.slug)}</h1>
              <ArticleMeta
                pathName={context.handleConvertName(article.author.username)}
                image={article.author.image}
                name={article.author.username}
                date={context.createdAt(article.createdAt)}
                favorite={favorite}
                setFavorite={setFavorite}
                follow = {follow}
                setFollow ={setFollow}
                slug={article.slug}
              />
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>
                {article.tagList.length > 0 && (
                  <ul className="tag-list">
                    {article.tagList.map((tag, index) => {
                      return (
                        <li
                          key={index}
                          className="tag-default tag-pill tag-outline"
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <ArticleMeta
                pathName={context.handleConvertName(article.author.username)}
                image={article.author.image}
                name={article.author.username}
                date={context.createdAt(article.createdAt)}
                favorite={favorite}
                setFavorite={setFavorite}
                follow = {follow}
                setFollow ={setFollow}
                slug={article.slug}
              />
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {user ? (
                  <>
                    <FormComment
                      image={user.image}
                      userLogin={user.username}
                      path={path}
                      setComments={setComments}
                    />
                  </>
                ) : (
                  <>
                    <Link to="/login">Sign in</Link>
                    <span> or </span>
                    <Link to="/register">Sign up</Link>
                    <span> to add comments on this article.</span>
                  </>
                )}
                <></>
                {comments !== []
                  ? comments.map((comment, index) => {
                      return (
                        <Card
                          key={index}
                          index={index}
                          id={comment.id}
                          slug={article.slug}
                          pathName={context.handleConvertName(
                            comment.author.username
                          )}
                          image={comment.author.image}
                          body={comment.body}
                          updatedAt={context.createdAt(comment.updatedAt)}
                          name={comment.author.username}
                          userLogin={user.username || ""}
                          setComments={setComments}
                        />
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
