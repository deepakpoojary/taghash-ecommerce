// src/components/ReviewForm.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const ReviewForm = () => {
  const [productName, setProductName] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews", {
        productName,
        reviewerName,
        reviewerEmail,
        rating,
        reviewText,
      });
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Product Name"
        variant="outlined"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <TextField
        label="Reviewer Name"
        variant="outlined"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        required
      />
      <TextField
        label="Reviewer Email"
        variant="outlined"
        type="email"
        value={reviewerEmail}
        onChange={(e) => setReviewerEmail(e.target.value)}
        required
      />
      <TextField
        label="Rating (1-5)"
        variant="outlined"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        required
      />
      <TextField
        label="Review Text"
        variant="outlined"
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
