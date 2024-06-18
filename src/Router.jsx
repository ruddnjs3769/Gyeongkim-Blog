import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/routes/Home";
import NotFound from "@/layouts/NotFound";
import BlogLayout from "./layouts/BlogLayout";
import LogInForm from "./components/LogInForm";
import BlogEdit from "@/routes/Blog/BlogEdit";
import PostDetail from "@/routes/Blog/PostDetail";
import Portfolio from "@/routes/Portfolio";
import Blog from "@/routes/Blog/Blog";
import BlogPosting from "@/routes/Blog/BlogPosting";
import BlogList from "@/routes/Blog/BlogList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route path="" element={<Blog />} />
          <Route path="posting" element={<BlogPosting />} />
          <Route path="edit/:id" element={<BlogEdit />} />
          <Route path="list" element={<BlogList />} />
          <Route path="detail/:id" element={<PostDetail />} />
        </Route>
        <Route path="/admin" element={<LogInForm />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
