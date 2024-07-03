import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameListPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://eight-bit-reviews.onrender.com/api/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="container bg-dark">
      <h1 className="mt-4 mb-4 text-light">Game List</h1>
      <div className="row">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className="col-md-4 mb-4 d-flex align-items-stretch"
            >
              <div className="card bg-dark text-white border border-warning rounded h-100">
                {/* Added border-warning and rounded classes for fun borders */}
                <Link to={`/games/${game.id}`}>
                  <img
                    src={game.image_url}
                    className="card-img-top"
                    alt={game.title}
                    style={{
                      height: "350px",
                      objectFit: "fill",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{game.title}</h5>
                    <p className="card-text flex-grow-1">{game.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Release Date: {game.release_date}
                      </small>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">Loading games...</p>
        )}
      </div>
    </div>
  );
};

export default GameListPage;
