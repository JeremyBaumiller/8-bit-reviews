import React, { useState, useEffect } from "react";

const GameListPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <img src={game.image_url} alt={game.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading games...</p>
      )}
    </div>
  );
};

export default GameListPage;
