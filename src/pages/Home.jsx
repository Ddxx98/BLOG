import React from "react";
import { Typography, Box } from "@mui/material";
import Blogs from "../components/Blogs";

export default function Home() {
  return (
    <Box p={2}>
      <Typography variant="h4" mb={3} align="center">My Blog App</Typography>
      <Blogs />
    </Box>
  );
}
