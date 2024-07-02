import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SubmitReviewPage = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);
  const navigate = useNavigate();

  // Fetch reviews from your API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://your-api-url/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviews = await response.json();
        setReviewsList(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to submit
      const newReview = { review, rating };

      // Make POST request to submit review to API
      const response = await fetch("https://your-api-url/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Reset form fields after successful submission
      setReview("");
      setRating(0);

      // Update reviews list after submission (fetch again or update locally)
      fetchReviews(); // Assuming you want to refresh the reviews list
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container bg-dark text-white py-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Submit Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">
                Review:
              </label>
              <textarea
                id="review"
                className="form-control"
                rows="5" // Adjust the number of rows for larger textarea
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
        <div className="col-md-8 mt-4">
          <h2 className="mb-4">Reviews</h2>
          <div className="list-group">
            {reviewsList.map((item) => (
              <div key={item.id} className="list-group-item">
                <h5 className="mb-1">Rating: {item.rating}</h5>
                <p className="mb-1">{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
