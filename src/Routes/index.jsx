import Home from "../Pages/Home";
import Auth from "../Pages/Auth";
import Settings from "../Pages/Settings";
import CreateOrEditArticle from "../Pages/CreateOrEditArticle";
import Profile from "../Pages/Profile"
import Article from "../Pages/Article";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Auth },
  { path: "/register", component: Auth },
  { path: "/settings", component: Settings },
  { path: "/editor", component: CreateOrEditArticle },
  { path: "/editor/:slug", component: CreateOrEditArticle },
  { path: "/:username", component: Profile},
  { path: "/article/:slug", component: Article }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
