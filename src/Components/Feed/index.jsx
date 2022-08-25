import React, { useContext } from "react";
import ArticlePreview from "../ArticlePreview";
import { UserContext } from "../../UserProvider";

const Feed = (props) => {
  const context = useContext(UserContext);
  return (
    <>
      {props.articles.length === 0 && <p>No articles here ...yet</p>}
      {props.articles.length > 0 && props.articles.map((article) => {
        return (
          <ArticlePreview
            key={article.slug}
            slug={article.slug}
            author={article.author}
            createdAt={context.createdAt(article.createdAt)}
            description={article.description}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            tagList={article.tagList}
            title={article.title}
          />
        );
      })}
    </>
  );
};

export default Feed;
