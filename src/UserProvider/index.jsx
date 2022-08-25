import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  let token = localStorage.getItem("jwtToken");
  const [user, setUser] = useState("");

  useEffect(() => {
    // get user
    if (!token) {
      return;
    }
    axios
      .get("https://api.realworld.io/api/user", {
        headers: {
          accept: "application/json",
          authorization: "Token " + token,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("jwtToken", response.data.user.token);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const sendData = async (input) => {
    return await axios[input.method](
      input.api,
      {
        user: {
          image: input.image || "",
          username: input.name,
          bio: input.bio || "",
          email: input.email,
          password: input.password,
        },
        article: {
            title: input.title,
            description: input.description,
            body: input.body,
            tagList: input.tagList,
        },
      },
      {
        headers: {
          accept: "application/json",
          authorization: "Token " + (token || ""),
        },
      }
    )
      .then((response) => {
        if (response.data.hasOwnProperty("user")) {
          localStorage.setItem("jwtToken", response.data.user.token);
          setUser(response.data.user);
        }
        if(response.data.hasOwnProperty('article')){
          return input.navigate(`/article/${response.data.article.slug}`)
        }
        input.navigate(input.path || "/");
      })
      .catch((err) => {
        return err
      });
  };

  const likeArticle = async (slug) => {
     return await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, {}, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: "Token " + token
      }
    })
    .catch(err => console.log(err))
  }

  const dislikeArticle = async (slug) => {
   return await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: "Token " + token
      }
    })
    .catch(err => console.log(err))
  }

  const createdAt = (createdAt) => {
    const date = new Date(createdAt)
    const year = date.getFullYear()
    const month = date.toLocaleString("en-US", {
      month: "long"
    })
    const day = date.getDate()
    return `${month} ${day}, ${year}`
  }

  const convertSlug = (slug) => {
    slug = slug.split("-")
    slug.pop()
    slug = slug.toString().split(",").join(" ")
    return slug
  }

  const handleConvertName = (name) => {
    const newName = name.split(" ").join("%20")
    return newName
  }

  const value = {
    user,
    setUser,
    sendData,
    likeArticle,
    dislikeArticle,
    createdAt,
    convertSlug,
    handleConvertName
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
