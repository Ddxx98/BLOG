import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent,
  TextField, Box, Button
} from "@mui/material";
import { useBlogs } from "../context/BlogsContext";

const getContainer = () => document.getElementById("portal-root");

export default function AddBlog({ open, handleClose, editData }) {
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const { addBlog, updateBlog } = useBlogs();

  useEffect(() => {
    if (editData) setForm(editData);
    else setForm({ name: "", description: "", image: "" });
  }, [editData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (editData && editData._id) await updateBlog(editData._id, form);
    else await addBlog(form);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    setForm({ name: "", description: "", image: "" });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      container={getContainer()}
    >
      <DialogTitle>{editData ? "Edit Blog" : "Add Blog"}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
        <TextField margin="dense" name="description" label="Description" value={form.description} multiline rows={2} onChange={handleChange} fullWidth />
        <TextField margin="dense" name="image" label="Image URL" value={form.image} onChange={handleChange} fullWidth />
        <Box mt={2}>
          <Button onClick={handleSubmit} variant="contained">{editData ? "Update" : "Add"}</Button>
          <Button onClick={handleCancel} sx={{ ml: 2, color: "red", borderColor: "red" }} variant="outlined">Cancel</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
