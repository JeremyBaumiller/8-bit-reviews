import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://eight-bit-reviews.onrender.com/api/games/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  return (
    <div
      className="container bg-dark text-light"
      style={{
        border: "5px solid gold",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h1>{data.title}</h1>
            <p>Release Date: {data.release_date}</p>
            <p>Developer: {data.developer}</p>
            <p>Publisher: {data.publisher}</p>
            <p>Platform: {data.platform}</p>
            <p>Genre: {data.genre}</p>
            <p>Description: {data.description}</p>
            <p>ESRB Rating: {data.esrb_rating}</p>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={data.image_url}
              alt={data.title}
              className="img-fluid"
              style={{ width: "300px", height: "300px", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetailPage;
