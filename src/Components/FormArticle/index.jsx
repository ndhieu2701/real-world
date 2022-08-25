import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Tag from "../Tag";
import axios from "axios";
import Loading from "../Loading";

const FormArticle = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const slug = useLocation().pathname;
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if(slug === "/editor") {
      setIsLoading(false)
    }
    if (slug !== "/editor") {
      axios
        .get(`https://api.realworld.io/api/articles/${slug.split("/")[2]}`, {
          headers: {
            accept: "application/json",
            authorization: "Token " + token,
          },
        })
        .then((res) => {
          setTitle(res.data.article.title);
          setDescription(res.data.article.description);
          setBody(res.data.article.body);
          setTagList(res.data.article.tagList);
          setIsLoading(false);
        });
    }
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleInputTag = (e) => {
    setInputTag(e.target.value);
  };

  const handleSubmit = () => {
    if (slug === "/editor") {
      context
        .sendData({
          api: "https://api.realworld.io/api/articles",
          method: "post",
          title,
          description,
          body,
          tagList,
          navigate,
        })
        .then((err) => console.log(err));
    } else {
      context
        .sendData({
          api: `https://api.realworld.io/api/articles/${slug.split("/")[2]}`,
          method: "put",
          title,
          description,
          body,
          tagList,
          navigate,
        })
        .then((err) => console.log(err));
    }
  };
  
  const handleTagList = (e) => {
    if (e.keyCode === 13 && inputTag !== "" && !tagList.includes(inputTag)) {
      setTagList((tagList) => [...tagList, inputTag]);
      setInputTag("");
      e.target.value = "";
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <form>
          <fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Article Title"
                onChange={handleTitle}
                value={title || ""}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                onChange={handleDescription}
                value={description || ""}
              />
            </fieldset>
            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                onChange={handleBody}
                value={body || ""}
              ></textarea>
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tags"
                onChange={handleInputTag}
                onKeyDown={(e) => handleTagList(e)}
              />
              <div className="tag-list">
                {tagList.map((tag, index) => {
                  return (
                    <Tag
                      haveCloseIcon={true}
                      key={index}
                      id={index}
                      value={tag}
                      setTagList={setTagList}
                    />
                  );
                })}
              </div>
            </fieldset>
            <button
              className="btn btn-lg pull-xs-right btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Publish Article
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default FormArticle;
