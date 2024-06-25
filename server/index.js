const express = require("express")();
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`it's alive on https://localhost:${PORT}`));
app.use(express.json());

app.get("/games", (req, res) => {
  res.status(200).send({
    title: "",
    year: "",
    esrb_rating: "",
    platform: "",
    number_of_players: "",
  });
});

app.post("/games/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "we need a logo!" });
  }

  res.send({
    title: `games with your ${logo} and ID of ${id}`,
  });
});

// Start the server
//const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}`));
//} catch (error) {
//console.error("Error during initialization:", error);
//}
//};

//init();
//initalizing file to run init function, db js should hold functions to write sql
