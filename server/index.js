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
      image_url:
        "data:image/jpeg;base64,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",
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
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png",
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
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg",
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
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Donkey_Kong_flier.jpg",
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
      image_url: "https://upload.wikimedia.org/wikipedia/en/1/16/Pac_flyer.png",
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
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/1/1d/SF2_JPN_flyer.jpg",
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
