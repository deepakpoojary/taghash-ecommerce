import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsRes = await axios.get("http://localhost:5000/api/reviews");
        setReviews(reviewsRes.data);

        const averageRatingRes = await axios.get(
          "http://localhost:5000/api/reviews1/average-rating"
        );
        setAverageRating(averageRatingRes.data.averageRating);

        const reviewCountRes = await axios.get(
          "http://localhost:5000/api/reviews1/review-count"
        );
        setReviewCount(reviewCountRes.data.reviewCount);

        const ratingDistributionRes = await axios.get(
          "http://localhost:5000/api/reviews1/rating-distribution"
        );
        setRatingDistribution(ratingDistributionRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const ratingLabels = ratingDistribution.map((item) => `${item.rating}-star`);
  const ratingValues = ratingDistribution.map((item) => item.count);

  const barData = {
    labels: ratingLabels,
    datasets: [
      {
        label: "Ratings Distribution",
        data: ratingValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ratingLabels,
    datasets: [
      {
        label: "Ratings Distribution",
        data: ratingValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Review Dashboard</h1>
      <div>
        <h2>Reviews Table</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Reviewer Name</th>
              <th>Rating</th>
              <th>Date of Submission</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.product_name}</td>
                <td>{review.reviewer_name}</td>
                <td>{review.rating}</td>
                <td>
                  {new Date(review.date_of_submission).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Summary</h2>
        <p>
          <strong>Average Rating:</strong> {averageRating}
        </p>
        <p>
          <strong>Total Reviews:</strong> {reviewCount}
        </p>
      </div>
      <div>
        <h2>Rating Distribution Bar Chart</h2>
        <Bar data={barData} options={{ responsive: true }} />
      </div>
      <div>
        <h2>Rating Distribution Pie Chart</h2>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
