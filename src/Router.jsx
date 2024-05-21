import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "@/routes/HomePage";
import PortfolioPage from "@/routes/PortfolioPage";
import BlogPage from "@/routes/BlogPage";
import BlogPosting from "@/routes/BlogPosting";
import BlogList from "@/routes/BlogList";
import NotFound from "@/layouts/NotFound";
import BlogLayout from "./layouts/BlogLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route path="" element={<BlogPage />} />
          <Route path="posting" element={<BlogPosting />} />
          <Route path="list" element={<BlogList />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
