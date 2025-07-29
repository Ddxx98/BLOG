import React from "react";
import { BlogsProvider } from "./context/BlogsContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <BlogsProvider>
      <Home />
    </BlogsProvider>
  );
}
