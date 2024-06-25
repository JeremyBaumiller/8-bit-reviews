const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const {
  client,
  createGame,
  createTable,
  fetchGames,
  // ... other functions from db
} = require("./db");

app.use(express.json());

// Connect to the database and initialize tables
const init = async () => {
  try {
    await client.connect();
    console.log("Connected to database");

    await createTable();
    console.log("Table created");

    const [
      SuperMarioWorld,
      SuperPunchOut,
      SuperCastlevania,
      SuperMetroid,
      Spawn,
      Brainlord,
      ChronoTrigger,
    ] = await Promise.all([
      createGame({ title: "Super Mario World" }),
      createGame({ title: "Super Punch-Out!!" }),
      createGame({ title: "Super Castlevania IV" }),
      createGame({ title: "Super Metroid" }),
      createGame({ title: "Spawn" }),
      createGame({ title: "Brainlord" }),
      createGame({ title: "Chrono Trigger" }),
    ]);

    console.log("Games created");
  } catch (error) {
    console.error("Initialization error: ", error);
  }
};

// Routes
app.get("/games", async (req, res, next) => {
  try {
    const games = await fetchGames();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
});

app.post("/games/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "We need a logo!" });
  } else {
    res.send({
      title: `Games with your ${logo} and ID of ${id}`,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`It's alive on https://localhost:${PORT}`);
  init();
});
