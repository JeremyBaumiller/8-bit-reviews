import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SubmitReviewPage = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the review to the server or store it in state
    console.log("Review submitted:", { review, rating });

    // Redirect to the home page after submission
    navigate("/");
  };

  return (
    <div className="container bg-dark text-white py-5">
      <h2 className="mb-4">Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Review:
          </label>
          <textarea
            id="review"
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating:
          </label>
          <input
            id="rating"
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReviewPage;
