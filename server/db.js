const { client, createGame, createTable, fetchGames } = require("./db");
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const init = async () => {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to database");

    // Create table if it doesn't exist
    await createTable();
    console.log("Table created");

    // Populate the table with initial game data
    await Promise.all([
      createGame({ title: "SuperMarioWorld" }),
      createGame({ title: "SuperPunchOut" }),
      createGame({ title: "SuperCastlevaina" }),
      createGame({ title: "SuperMetroid" }),
      createGame({ title: "Spawn" }),
      createGame({ title: "Brainlord" }),
      createGame({ title: "ChronoTrigger" }),
    ]);

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();

// Define API endpoint to fetch games
app.get("/api/games", async (req, res, next) => {
  try {
    const games = await fetchGames();
    res.send(games);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal Server Error" });
});
