const { client, createGame, createTable, fetchGames } = require("./db2");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { options } = require("pg/lib/defaults");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "public")));

// Connect to the database and initialize tables
const init = async () => {
  //try {
  await client.connect();
  console.log("Connected to database");
  await createTable();
  //console.log(await fetchGames());
  console.log("Table created");

  const [] = await Promise.all([
    createGame({
      title: "Super Mario Bros.",
      release_date: 1985,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "NES",
      genre: "Platformer",
      description:
        "Super Mario Bros. is a classic platformer where players control Mario as he navigates the Mushroom Kingdom to rescue Princess Toadstool from Bowser.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/1.mario.jpg",
    }),
    createGame({
      title: "The Legend of Zelda",
      release_date: 1986,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "NES",
      genre: "Action-Adventure",
      description:
        "The Legend of Zelda follows Link as he embarks on a quest to rescue Princess Zelda and defeat the evil Ganon by exploring dungeons and solving puzzles.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/2.zelda.jpg",
    }),
    createGame({
      title: "Sonic the Hedgehog",
      release_date: 1991,
      developer: "Sega",
      publisher: "Sega",
      platform: "Sega Genesis",
      genre: "Platformer",
      description:
        "Sonic the Hedgehog introduces Sonic, a speedy blue hedgehog, in his quest to stop the evil Dr. Robotnik from taking over the world.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/3.Sonic.jpg",
    }),
    createGame({
      title: "Donkey Kong",
      release_date: 1981,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "Arcade",
      genre: "Platformer",
      description:
        "Donkey Kong is an arcade classic where players control Jumpman (Mario) to rescue Pauline from Donkey Kong.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/4.Donkey_Kong.jpg",
    }),
    createGame({
      title: "Pac-Man",
      release_date: 1980,
      developer: "Namco",
      publisher: "Namco",
      platform: "Arcade",
      genre: "Puzzle",
      description:
        "Pac-Man is a classic arcade game where players control Pac-Man to eat pellets and avoid ghosts.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/5.pac-man.jpg",
    }),
    createGame({
      title: "Street Fighter II",
      release_date: 1991,
      developer: "Capcom",
      publisher: "Capcom",
      platform: "Arcade",
      genre: "Fighting",
      description:
        "Street Fighter II is a popular fighting game featuring iconic characters battling against each other in competitive matches.",
      esrb_rating: "T",
      image_url: "8-bit-reviews/client/public/covers/6.street_fighter_II.jpg",
    }),
    createGame({
      title: "Mega Man 2",
      release_date: 1988,
      developer: "Capcom",
      publisher: "Capcom",
      platform: "NES",
      genre: "Platformer",
      description:
        "Mega Man 2 follows Mega Man in his quest to defeat Dr. Wily and his Robot Masters using various weapons obtained from defeated bosses.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/7.Megaman2.jpg",
    }),
    createGame({
      title: "Final Fantasy VII",
      release_date: 1997,
      developer: "Square",
      publisher: "Square",
      platform: "PlayStation",
      genre: "RPG",
      description:
        "Final Fantasy VII is an epic RPG where players control Cloud Strife and his allies to stop the villain Sephiroth from destroying the world.",
      esrb_rating: "T",
      image_url: "8-bit-reviews/client/public/covers/8.Final_Fantasy_VII.jpg",
    }),
    createGame({
      title: "Chrono Trigger",
      release_date: 1995,
      developer: "Square",
      publisher: "Square",
      platform: "SNES",
      genre: "RPG",
      description:
        "Chrono Trigger follows Crono and his friends as they travel through time to prevent a global catastrophe orchestrated by the powerful Lavos.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/9.Chrono_Trigger.jpg",
    }),
    createGame({
      title: "Castlevania: Symphony of the Night",
      release_date: 1997,
      developer: "Konami",
      publisher: "Konami",
      platform: "PlayStation",
      genre: "Action-Adventure",
      description:
        "Castlevania: Symphony of the Night stars Alucard as he explores Dracula's castle to uncover secrets and defeat powerful creatures.",
      esrb_rating: "T",
      image_url:
        "8-bit-reviews/client/public/covers/10.Castlevania_SOTN_PAL.jpg",
    }),
    createGame({
      title: "Super Metroid",
      release_date: 1994,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "SNES",
      genre: "Action-Adventure",
      description:
        "Super Metroid follows Samus Aran in her mission to rescue the baby Metroid from the Space Pirates and Mother Brain on planet Zebes.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/11.Smetroid.jpg",
    }),
    createGame({
      title: "Half-Life",
      release_date: 1998,
      developer: "Valve",
      publisher: "Sierra Studios",
      platform: "PC",
      genre: "FPS",
      description:
        "Half-Life is a groundbreaking FPS where players assume the role of Gordon Freeman as he battles aliens and government soldiers in the Black Mesa Research Facility.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/12.Half-Life.jpg",
    }),
    createGame({
      title: "Doom",
      release_date: 1993,
      developer: "id Software",
      publisher: "id Software",
      platform: "PC",
      genre: "FPS",
      description:
        "Doom is a pioneering FPS game where players fight against demons from Hell on Mars as the unnamed space marine, known as Doomguy.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/13.Doom.jpg",
    }),
    createGame({
      title: "The Secret of Monkey Island",
      release_date: 1990,
      developer: "Lucasfilm Games",
      publisher: "Lucasfilm Games",
      platform: "PC",
      genre: "Adventure",
      description:
        "The Secret of Monkey Island follows Guybrush Threepwood as he seeks to become a pirate and rescue the governor from the ghost pirate LeChuck.",
      esrb_rating: "E",
      image_url:
        "8-bit)-reviews/client/public/covers/14.The_Secret_of_Monkey_Island.jpg",
    }),
    createGame({
      title: "Metroid",
      release_date: 1986,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "NES",
      genre: "Action-Adventure",
      description:
        "Metroid introduces players to Samus Aran as she explores the planet Zebes to eradicate the Space Pirates and Mother Brain.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/15.Metroid.jpg",
    }),
    createGame({
      title: "EarthBound",
      release_date: 1994,
      developer: "HAL Laboratory",
      publisher: "Nintendo",
      platform: "SNES",
      genre: "RPG",
      description:
        "EarthBound follows Ness and his friends as they embark on a journey to stop the alien Giygas from taking over the world using psychic powers and humor.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/16.EarthBound.jpg",
    }),
    createGame({
      title: "Star Fox",
      release_date: 1993,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "SNES",
      genre: "Rail Shooter",
      description:
        "Star Fox is a rail shooter where players control Fox McCloud and his team of anthropomorphic animals in spacecrafts to defend the Lylat system from Andross.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/17.Star_Fox.jpg",
    }),
    createGame({
      title: "Kirby's Adventure",
      release_date: 1993,
      developer: "HAL Laboratory",
      publisher: "Nintendo",
      platform: "NES",
      genre: "Platformer",
      description:
        "Kirby's Adventure stars Kirby, a pink puffball with the ability to inhale enemies and gain their powers, on a quest to restore the Star Rod and save Dream Land from darkness.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/18.Kirby_Adventure.jpg",
    }),
    createGame({
      title: "Contra",
      release_date: 1987,
      developer: "Konami",
      publisher: "Konami",
      platform: "NES",
      genre: "Run and Gun",
      description:
        "Contra is a run-and-gun game where players control soldiers Bill and Lance in their mission to thwart an alien invasion by destroying enemy forces and bosses.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/19.Contra.jpg",
    }),
    createGame({
      title: "Duck Hunt",
      release_date: 1984,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "NES",
      genre: "Light Gun Shooter",
      description:
        "Duck Hunt is a light gun shooter where players use the NES Zapper to shoot ducks and clay pigeons as they appear on the screen.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/20.DuckHunt.jpg",
    }),
    createGame({
      title: "Tetris",
      release_date: 1984,
      developer: "Elorg",
      publisher: "Nintendo",
      platform: "Multiple",
      genre: "Puzzle",
      description:
        "Tetris is a tile-matching puzzle game where players rotate and arrange falling tetrominoes to create complete lines and prevent the stack from reaching the top of the screen.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/21.Tetris.jpg",
    }),
    createGame({
      title: "Mortal Kombat",
      release_date: 1992,
      developer: "Midway",
      publisher: "Acclaim Entertainment",
      platform: "Arcade",
      genre: "Fighting",
      description:
        "Mortal Kombat is a fighting game known for its brutal combat and fatalities as players choose iconic fighters to battle in a tournament for supremacy.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/22.Mortal_Kombat.jpg",
    }),
    createGame({
      title: "Resident Evil",
      release_date: 1996,
      developer: "Capcom",
      publisher: "Capcom",
      platform: "PlayStation",
      genre: "Survival Horror",
      description:
        "Resident Evil follows Chris Redfield and Jill Valentine of S.T.A.R.S. as they investigate a mansion filled with zombies and uncover the Umbrella Corporation's sinister experiments.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/23.resident_evil.jpg",
    }),
    createGame({
      title: "Pokemon Red/Blue",
      release_date: 1996,
      developer: "Game Freak",
      publisher: "Nintendo",
      platform: "Game Boy",
      genre: "RPG",
      description:
        "Pokemon Red/Blue tasks players with becoming a Pokemon Trainer, capturing and training Pokemon to become the Pokemon Champion while thwarting Team Rocket's evil plans.",
      esrb_rating: "E",
      image_url:
        "8-bit-reviews/client/public/covers/24.pokemon_red_version.jpg",
    }),
    createGame({
      title: "GoldenEye 007",
      release_date: 1997,
      developer: "Rare",
      publisher: "Nintendo",
      platform: "Nintendo 64",
      genre: "FPS",
      description:
        "GoldenEye 007 is an FPS where players assume the role of James Bond in a mission to stop a criminal syndicate from using a satellite weapon to destroy London.",
      esrb_rating: "T",
      image_url: "8-bit-reviews/client/public/covers/25.goldeneye.jpg",
    }),
    createGame({
      title: "The Legend of Zelda: Ocarina of Time",
      release_date: 1998,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "Nintendo 64",
      genre: "Action-Adventure",
      description:
        "The Legend of Zelda: Ocarina of Time follows Link as he travels through time to stop Ganondorf from obtaining the Triforce and conquering the kingdom of Hyrule.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/26.zelda_64.jpg",
    }),
    createGame({
      title: "Gran Turismo",
      release_date: 1997,
      developer: "Polyphony Digital",
      publisher: "Sony Computer Entertainment",
      platform: "PlayStation",
      genre: "Racing",
      description:
        "Gran Turismo is a racing simulator where players compete in various races and challenges to earn credits and unlock new cars for their collection.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/27.Gran_Turismo.jpg",
    }),
    createGame({
      title: "Metal Gear Solid",
      release_date: 1998,
      developer: "Konami",
      publisher: "Konami",
      platform: "PlayStation",
      genre: "Stealth Action",
      description:
        "Metal Gear Solid follows Solid Snake as he infiltrates a nuclear weapons facility to neutralize terrorists threatening to launch a nuclear strike.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/28.metal_gear_solid.jpg",
    }),
    createGame({
      title: "Crash Bandicoot",
      release_date: 1996,
      developer: "Naughty Dog",
      publisher: "Sony Computer Entertainment",
      platform: "PlayStation",
      genre: "Platformer",
      description:
        "Crash Bandicoot stars Crash in his quest to rescue his girlfriend Tawna and thwart the evil plans of Dr. Neo Cortex by traversing various levels and defeating enemies.",
      esrb_rating: "E",
      image_url: "8-bit-reviews/client/public/covers/29.crash_bandicoot.jpg",
    }),
    createGame({
      title: "Tony Hawk's Pro Skater",
      release_date: 1999,
      developer: "Neversoft",
      publisher: "Activision",
      platform: "PlayStation",
      genre: "Sports",
      description:
        "Tony Hawk's Pro Skater allows players to skate as legendary skateboarders in various locations, performing tricks and completing objectives to earn points and unlock new content.",
      esrb_rating: "T",
      image_url: "8-bit-reviews/client/public/covers/30.TonyHawksProSkater.jpg",
    }),
    createGame({
      title: "StarCraft",
      release_date: 1998,
      developer: "Blizzard Entertainment",
      publisher: "Blizzard Entertainment",
      platform: "PC",
      genre: "RTS",
      description:
        "StarCraft is a real-time strategy game where players control one of three factions in a war for dominance across the galaxy by gathering resources, building bases, and commanding armies.",
      esrb_rating: "T",
      image_url: "8-bit-reviews/client/public/covers/31.StarCraft.jpg",
    }),
    createGame({
      title: "Diablo II",
      release_date: 2000,
      developer: "Blizzard Entertainment",
      publisher: "Blizzard Entertainment",
      platform: "PC",
      genre: "Action RPG",
      description:
        "Diablo II is an action RPG where players embark on a quest to defeat the Lord of Terror, Diablo, by exploring dungeons, collecting loot, and battling hordes of monsters.",
      esrb_rating: "M",
      image_url: "8-bit-reviews/client/public/covers/32.diable_II.jpg",
    }),
  ]);

  console.log(await fetchGames());
  console.log("Games created");
  //} catch (error) {
  // console.error("Initialization error: ", error);
  //}
};

init();

// Routes
app.get("/api/games", async (req, res, next) => {
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
});
