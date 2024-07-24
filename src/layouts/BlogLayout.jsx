import { Outlet, Link } from "react-router-dom";
import BlogNav from "../components/BlogNav";
import { logOut, getSession } from "@/supabase/adminLogin";
import { useEffect, useState } from "react";
import TagBar from "@/components/TagBar";

const BlogLayout = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };
    checkSession();
  }, [isLogin]);
  return (
    <div className="w-[80%]">
      <Link to="/blog">블로그!</Link>
      <TagBar />
      {isLogin && <button onClick={logOut}>로그아웃</button>}
      <BlogNav />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
