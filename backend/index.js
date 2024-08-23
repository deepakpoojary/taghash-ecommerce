const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "reviews",
  password: "yashmith",
  port: 5432,
});
// index.js

// Submit Review Endpoint (POST /api/reviews)
app.post("/api/reviews", async (req, res) => {
  const {
    productName,
    reviewerName,
    reviewerEmail,
    rating,
    reviewText,
    dateOfSubmission,
  } = req.body;
  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (product_name, reviewer_name, reviewer_email, rating, review_text, date_of_submission)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        productName,
        reviewerName,
        reviewerEmail,
        rating,
        reviewText,
        new Date().toISOString(),
      ]
    );
    res.json(newReview.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error1");
  }
});

// Get All Reviews Endpoint (GET /api/reviews)
app.get("/api/reviews", async (req, res) => {
  try {
    const allReviews = await pool.query("SELECT * FROM reviews");
    res.json(allReviews.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error2");
  }
});

// Get Review by ID Endpoint (GET /api/reviews/:id)
app.get("/api/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await pool.query("SELECT * FROM reviews WHERE id = $1", [
      id,
    ]);
    if (review.rows.length === 0) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.json(review.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error322");
  }
});

// Get Average Rating Endpoint (GET /api/reviews/average-rating)
app.get("/api/reviews1/average-rating", async (req, res) => {
  try {
    const averageRating = await pool.query("SELECT AVG(rating) FROM reviews");
    res.json({ averageRating: averageRating.rows[0].avg });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error2323");
  }
});

// Get Review Count Endpoint (GET /api/reviews/review-count)
app.get("/api/reviews1/review-count", async (req, res) => {
  try {
    console.log("hi");
    const countResult = await pool.query("SELECT COUNT(*) FROM reviews");
    const reviewCount = countResult.rows[0].count; // This is a string representation of the count
    res.json({ reviewCount: parseInt(reviewCount) });
    // res.json({ reviewCount: reviewCount.rows[0].count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error23");
  }
});

// Get Rating Distribution Endpoint (GET /api/reviews/rating-distribution)
app.get("/api/reviews1/rating-distribution", async (req, res) => {
  try {
    const ratingDistribution = await pool.query(`
        SELECT rating, COUNT(*) FROM reviews GROUP BY rating ORDER BY rating DESC
      `);
    res.json(ratingDistribution.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errorsd");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = pool;
