import URLS from "@/constants/urls";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex gap-5">
      <Link to={URLS.HOME}>HOME</Link>
      <Link to={URLS.BLOG}>BLOG</Link>
      <Link to={URLS.PORTFOLIO}>PORTFOLIO</Link>
    </div>
  );
};

export default NavBar;
