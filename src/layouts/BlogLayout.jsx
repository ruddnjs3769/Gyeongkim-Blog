import { Outlet } from "react-router-dom";
import BlogNav from "../components/BlogNav";

const BlogLayout = () => {
  return (
    <>
      <div>블로그!</div>
      <BlogNav />
      <Outlet />
    </>
  );
};

export default BlogLayout;
