import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SubmitReviewPage;
