import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BlogsContext = createContext();

export function useBlogs() {
  return useContext(BlogsContext);
}

export function BlogsProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/blogs");
      setBlogs(data);
    } catch {
      setBlogs([]);
    }
    setLoading(false);
  };


  const addBlog = async (blog) => {
    await axios.post("/api/blogs", blog);
    fetchBlogs();
  };

  const updateBlog = async (id, blog) => {
    const { _id, ...blogData } = blog;
    await axios.put(`/api/blogs/${id}`, blogData);
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`/api/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        loading,
        fetchBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
}
