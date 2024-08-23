// src/components/LandingPage.js
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Product Reviews
      </Typography>
      <Typography variant="h6" gutterBottom>
        Submit your product reviews or view the dashboard.
      </Typography>
      <Button
        component={Link}
        to="/submit-review"
        variant="contained"
        color="primary"
        size="large"
        sx={{ margin: 2 }}
      >
        Submit Review
      </Button>
      <Button
        component={Link}
        to="/dashboard"
        variant="outlined"
        color="secondary"
        size="large"
      >
        View Dashboard
      </Button>
    </Box>
  );
};

export default LandingPage;
