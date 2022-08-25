import React, { useContext}from "react"
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../../../UserProvider";


const Header = () => {
  const context = useContext(UserContext);
  const user = context.user
  let pathName = useLocation().pathname

  const activePage = (path) => {
    if(pathName === path){
      return 'active'
    }
    return 
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" >
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" class when you're on that page" --> */}
            <Link className={`nav-link ${activePage("/")}`}  to="/">
              Home
            </Link>
          </li>

          {user && <li className="nav-item">
            <Link className={`nav-link ${activePage("/editor")}`} to="/editor">
              <i className="ion-compose"></i>&nbsp;New Article
            </Link>
          </li>}

          {user && <li className="nav-item">
            <Link className={`nav-link ${activePage("/settings")}`} to="/settings" >
              <i className="ion-gear-a"></i>&nbsp;Settings
            </Link>
          </li>}

          {user && <li className="nav-item">
            <Link className={`nav-link ${activePage(`/${context.handleConvertName(user.username)}`)}`} to = {`/${user.username}`} >
              {user.username}
            </Link>
          </li>}
          
          {!user && <li className="nav-item">
            <Link className={`nav-link ${activePage("/login")}`} to="/login">
              Sign in
            </Link>
          </li>}
          {!user && <li className="nav-item">
            <Link className={`nav-link ${activePage("/register")}`} to="/register">
              Sign up
            </Link>
          </li>}
        </ul>
      </div>
    </nav>
  )
}

export default Header
