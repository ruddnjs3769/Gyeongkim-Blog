import { Link } from "react-router-dom";
import URLS from "@/constants/urls";

const BlogNav = () => {
  return (
    <div className="flex w-full gap-16">
      <Link to={URLS.BLOG_POST}>글 작성하기</Link>
      <Link to={URLS.BLOG_LIST}>전체 게시글</Link>
    </div>
  );
};

export default BlogNav;
