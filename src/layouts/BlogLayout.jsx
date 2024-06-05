import { Outlet, Link } from "react-router-dom";
import BlogNav from "../components/BlogNav";

const BlogLayout = () => {
  return (
    <div className="w-[80%]">
      <Link to="/blog">블로그!</Link>
      <BlogNav />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
