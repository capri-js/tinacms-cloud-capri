import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { PostsPage } from "./PostsPage";
import BlogPostPage from "./BlogPostPage";
import "../styles.css";
import { Page } from "./Page";

export function App() {
  return (
    <Suspense>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/:slug" element={<BlogPostPage />} />
        <Route path="/:slug" element={<Page />} />
      </Routes>
    </Suspense>
  );
}
