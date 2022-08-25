import axios from "axios";
import React, { useEffect, useState } from "react";
import Tag from "../Tag";

const PopularTags = (props) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.realworld.io/api/tags", {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setTags(response.data.tags);
      });
  }, []);
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((tag, index) => {
            return (
              <Tag
                key={index}
                haveCloseIcon={false}
                value={tag}
                setTagActive={props.setTagActive}
                setFeedActive={props.setFeedActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
