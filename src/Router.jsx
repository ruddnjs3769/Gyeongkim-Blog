import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/routes/HomePage";
import PortfolioPage from "@/routes/PortfolioPage";
import BlogPage from "@/routes/BlogPage";
import BlogPosting from "@/routes/BlogPosting";
import BlogList from "@/routes/BlogList";
import NotFound from "@/layouts/NotFound";
import BlogLayout from "./layouts/BlogLayout";
import LogInForm from "./components/LogInForm";
import BlogEdit from "@/routes/BlogEdit";
import PostDetail from "@/routes/PostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route path="" element={<BlogPage />} />
          <Route path="posting" element={<BlogPosting />} />
          <Route path="edit/:id" element={<BlogEdit />} />
          <Route path="list" element={<BlogList />} />
          <Route path=":id" element={<PostDetail />} />
        </Route>
        <Route path="/admin" element={<LogInForm />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
