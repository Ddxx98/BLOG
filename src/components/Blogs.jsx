import React, { useState } from "react";
import {
  Grid, Card, CardMedia, CardContent,
  Typography, CardActions, IconButton, Button, Box, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBlog from "./AddBlog";
import { useBlogs } from "../context/BlogsContext";

export default function Blogs() {
  const { blogs, loading, deleteBlog } = useBlogs();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };
  const handleEdit = (blog) => {
    setEditData(blog);
    setOpen(true);
  };

  if (loading) return <Box my={5} display="flex" justifyContent="center"><CircularProgress /></Box>;

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleAdd}>Add Blog</Button>
      </Box>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={blog.image}
                alt={blog.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{blog.name}</Typography>
                <Typography variant="body2">{blog.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(blog)}><EditIcon /></IconButton>
                <IconButton onClick={() => deleteBlog(blog._id)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddBlog open={open} handleClose={() => setOpen(false)} editData={editData} />
    </Box>
  );
}
