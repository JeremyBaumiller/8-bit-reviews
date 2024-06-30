import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameListPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="container bg-light">
      {/* Apply bg-dark class here for black background */}
      <h1 className="mt-4 mb-4 text-light">Game List</h1>
      {/* Add text-light for light-colored text on dark background */}
      <div className="row">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-white">
                {" "}
                {/* Apply bg-dark and text-white classes */}
                <Link to={`/games/${game.id}`}>
                  <img
                    src={game.image_url}
                    className="card-img-top"
                    alt={game.title}
                    style={{
                      height: "350px",
                      width: "250px",
                      objectFit: "fill",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{game.title}</h5>
                    <p className="card-text">{game.description}</p>
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
