const {
  client,
  createGame,
  createUser,
  createTable,
  fetchGames,
  fetchGame,
  createReview,
  fetchReviewsByGameId,
  fetchUsers,
} = require("./db2");
const express = require("express");
const cors = require("cors");
const path = require("path");

const { options } = require("pg/lib/defaults");
const app = express();

const PORT = process.env.PORT || 3000;

const { v4: uuidv4 } = require("uuid");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);
const init = async () => {
  await client.connect();
  console.log("Connected to database");
  await createTable();
  console.log("Table created");

  const [] = await Promise.all([
    createUser({
      id: "c8d5c0b4-1fd1-4b6d-9e77-4d3f847dc7db",
      username: "Mario",
      email: "mario@example.com",
      password: "password1",
      join_date: "2023-01-01",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMk5lXjt8WO3iCoNXzDDYEOv4c_v1DnR0isw&s",
    }),
    createUser({
      id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      username: "Link",
      email: "link@example.com",
      password: "password2",
      join_date: "2023-02-01",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbnTmQOfE2MS8ndNazMK3e0_xC2ZGY8eHm5A&s",
    }),
    createUser({
      id: "bbeb7643-7c77-4443-8f6b-4d72b4f7cbbe",
      username: "Samus",
      email: "samus@example.com",
      password: "password3",
      join_date: "2023-03-01",
      image_url:
        "https://external-preview.redd.it/ZAs5NgcM2M6t0QqZiaQsKDI9TMwmSTTJkCfEAIOJQKU.jpg?width=640&crop=smart&auto=webp&s=083bfa305a565082aa8e16bce890fea6e8e58617",
    }),
    createUser({
      id: "32c8db2f-9e0b-4d7d-9ff7-f72f3fef482f",
      username: "LaraCroft",
      email: "laracroft@example.com",
      password: "password6",
      join_date: "2023-06-01",
      image_url:
        "https://pbs.twimg.com/profile_images/1295398740254027776/b3NhwST0_400x400.jpg",
    }),
    createUser({
      id: "c1e19d5f-7955-40b4-92b4-e0b0e5a2a4b4",
      username: "MasterChief",
      email: "masterchief@example.com",
      password: "password7",
      join_date: "2023-07-01",
      image_url:
        "https://pbs.twimg.com/profile_images/1487458038479003651/QaaBLRjC_400x400.jpg",
    }),
    createUser({
      id: "ab3e2899-6055-4d1f-b3e2-ffdbd05d7c4d",
      username: "Kratos",
      email: "kratos@example.com",
      password: "password8",
      join_date: "2023-08-01",
      image_url:
        "https://pbs.twimg.com/profile_images/1531848535443791872/2DU_fNTn_400x400.jpg",
    }),
    createUser({
      id: "fde0b94a-5280-42d9-ae3d-1c2e7f7a2b4d",
      username: "Cloud",
      email: "cloud@example.com",
      password: "password10",
      join_date: "2023-10-01",
      image_url:
        "https://pbs.twimg.com/profile_images/1506965037482536961/PLau5P3a_400x400.jpg",
    }),
    createUser({
      id: "bbd17643-7c77-4443-8f6b-4d72b4f7cbca",
      username: "NathanDrake",
      email: "nathandrake@example.com",
      password: "password13",
      join_date: "2024-01-01",
      image_url:
        "https://i.pinimg.com/originals/3d/08/5f/3d085fcfd035c20a099f2c7e12ae4f0b.jpg",
    }),
    createUser({
      id: "f3f5a8d8-f24e-4d36-8a91-329ddf9d0e66",
      username: "Dante",
      email: "dante@example.com",
      password: "password15",
      join_date: "2024-03-01",
      image_url:
        "https://steamuserimages-a.akamaihd.net/ugc/28476336363410364/A2A967006BE76961F00056717D8099752E900F5D/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    }),
    createUser({
      id: "32d8eb2f-9e0b-4d7d-9ff7-f72f3fef593f",
      username: "GordonFreeman",
      email: "gordonfreeman@example.com",
      password: "password16",
      join_date: "2024-04-01",
      image_url:
        "https://i1.sndcdn.com/artworks-000196534350-fh799u-t500x500.jpg",
    }),
    createUser({
      id: "c1f29d5f-7955-40b4-92b4-e0b0e5a2a5b5",
      username: "SolidSnake",
      email: "solidsnake@example.com",
      password: "password17",
      join_date: "2024-05-01",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4JC8OiEI7oo0dK2vmA__IMyEJXrIkljnOA&s",
    }),
    createUser({
      id: "ab4f2899-6055-4d1f-b3e2-ffdbd05d8d5d",
      username: "Ellie",
      email: "ellie@example.com",
      password: "password18",
      join_date: "2024-06-01",
      image_url:
        "https://64.media.tumblr.com/3f16d430e3e19f6bd6379f7ca677ff78/6942db55fb4ae225-0a/s1280x1920/241e6e440b9357d55cdf5ce232f60f6baa13be4a.jpg",
    }),
    createUser({
      id: "7d60b8d9-6859-4f3b-ae3f-3fb0d7c9d8e4",
      username: "JillValentine",
      email: "jillvalentine@example.com",
      password: "password19",
      join_date: "2024-07-01",
      image_url:
        "https://i.pinimg.com/736x/3f/4d/79/3f4d790de267dc562102674d066843c9.jpg",
    }),
    createUser({
      id: "fde1b94a-5280-42d9-ae3d-1c2e7f7a2b5e",
      username: "CommanderShepard",
      email: "commandershepard@example.com",
      password: "password20",
      join_date: "2024-08-01",
      image_url:
        "https://i.pinimg.com/originals/3d/7d/d1/3d7dd1a86956eb44ff3f679a68a4a4cc.png",
    }),
  ]);

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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png",
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
      ESRB_Rating: "E",
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
      ESRB_Rating: "E",
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
      ESRB_Rating: "E",
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
      ESRB_Rating: "E",
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
      ESRB_Rating: "T",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/b/be/Megaman2_box.jpg",
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
      ESRB_Rating: "T",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg",
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
      ESRB_Rating: "E",
      image_url: "https://i.servimg.com/u/f10/20/12/92/19/tm/chrono15.png",
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
      ESRB_Rating: "T",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/c/cf/Castlevania_SOTN_PAL.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Half-Life_Cover_Art.jpg/220px-Half-Life_Cover_Art.jpg",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/a/a8/The_Secret_of_Monkey_Island_artwork.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Metroid_boxart.jpg/220px-Metroid_boxart.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/1/1f/EarthBound_Box.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/5/52/Star_Fox_SNES.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Kirby%27s_Adventure_Coverart.png/220px-Kirby%27s_Adventure_Coverart.png",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/6/65/Contra_cover.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/DuckHuntBox.jpg/220px-DuckHuntBox.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/4/4a/Tetris_Boxshot.jpg",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/3/33/Mortal_Kombat_cover.JPG",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png",
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
      ESRB_Rating: "E",
      image_url:
        "https://pm1.aminoapps.com/6315/316ff2f9adf15e6b32b2b8aaf817b44bc4cff334_00.jpg",
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
      ESRB_Rating: "T",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/3/36/GoldenEye007box.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikibooks/en/9/98/Ocarina_of_Time_box_art.jpg",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/c/c8/Gran_Turismo_-_Cover_-_JP.jpg",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/3/33/Metal_Gear_Solid_cover_art.png",
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
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/4/44/Crash_Bandicoot_Cover.png",
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
      ESRB_Rating: "T",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/TonyHawksProSkaterPlayStation1.jpg/220px-TonyHawksProSkaterPlayStation1.jpg",
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
      ESRB_Rating: "T",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/9/93/StarCraft_box_art.jpg",
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
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Diablo_II_Coverart.png",
    }),
    createGame({
      title: "Super Punch-Out!!",
      release_date: 1994,
      developer: "Nintendo",
      publisher: "Nintendo",
      platform: "Super Nintendo Entertainment System (SNES)",
      genre: "Sports, Fighting",
      description:
        "Super Punch-Out!! is a boxing video game where players control Little Mac as he fights his way to the top of the World Video Boxing Association by defeating various quirky opponents.",
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/4/40/Superpunchoutbox.jpg",
    }),
    createGame({
      title: "Mega Man X",
      release_date: 1993,
      developer: "Capcom",
      publisher: "Capcom",
      platform: "Super Nintendo Entertainment System (SNES)",
      genre: "Action, Platformer",
      description:
        "Mega Man X is an action-platformer where players control X, a Maverick Hunter, as he battles against the forces of Sigma to save humanity from the rogue Reploids.",
      ESRB_Rating: "E",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png",
    }),
    createGame({
      title: "Duke Nukem 3D",
      release_date: 1996,
      developer: "3D Realms",
      publisher: "GT Interactive",
      platform: "MS-DOS, PlayStation, Sega Saturn, Nintendo 64, and others",
      genre: "First-person shooter",
      description:
        "Duke Nukem 3D is a first-person shooter where players control Duke Nukem as he battles alien invaders in a variety of urban environments, using a range of weapons and one-liners.",
      ESRB_Rating: "M",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Duke_Nukem_3D_Coverart.png/220px-Duke_Nukem_3D_Coverart.png",
    }),
    createGame({
      title: "Panzer Dragoon",
      release_date: 1995,
      developer: "Team Andromeda",
      publisher: "Sega",
      platform: "Sega Saturn",
      genre: "Rail shooter",
      description:
        "Panzer Dragoon is a rail shooter where players control a dragon rider named Keil Fluge as he navigates through various levels, shooting down enemies and obstacles to prevent the return of an ancient weapon.",
      ESRB_Rating: "E",
      image_url: "https://i.ebayimg.com/images/g/dfQAAOSw4slj3-bZ/s-l400.jpg",
    }),
    createGame({
      title: "The Simpsons Arcade Game",
      release_date: 1991,
      developer: "Konami",
      publisher: "Konami",
      platform: "Arcade",
      genre: "Beat 'em up",
      description:
        "The Simpsons Arcade Game is a beat 'em up game where players control members of the Simpson family as they fight through various levels to rescue Maggie from the clutches of Mr. Burns and Smithers.",
      ESRB_Rating: "Not Rated",
      image_url:
        "https://www.metacritic.com/a/img/catalog/provider/6/12/6-1-222935-52.jpg",
    }),
    createGame({
      title: "Gauntlet",
      release_date: 1985,
      developer: "Atari Games",
      publisher: "Atari Games",
      platform: "Arcade",
      genre: "Action, Dungeon crawler",
      description:
        "Gauntlet is an action dungeon crawler where players control one of four characters (Warrior, Valkyrie, Wizard, or Elf) as they navigate through maze-like dungeons, battling monsters and collecting treasures.",
      ESRB_Rating: "Not Rated",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/8/8a/Gauntlet_game_flyer.png",
    }),
    createGame({
      title: "Kamen Rider SD",
      release_date: 1993,
      developer: "Banpresto",
      publisher: "Bandai",
      platform: "Super Famicom",
      genre: "Action, Platformer",
      description:
        "Kamen Rider SD is an action platformer game featuring characters from the Kamen Rider series in a super-deformed (SD) style. Players control Kamen Riders as they battle enemies across various levels, using their unique abilities to defeat foes and progress through the game.",
      ESRB_Rating: "Not Rated",
      image_url: "https://i.ebayimg.com/images/g/1XUAAOSwhcJWI24q/s-l600.jpg",
    }),
  ]);

  const [] = await Promise.all([
    createReview({
      review_date: 2024 - 6 - 25,
      rating: 5,
      title: "Timeless Classic",
      content:
        "Super Mario Bros. is a game that never gets old. The level design is brilliant, and the gameplay is incredibly fun.",
    }),
    createReview({
      review_date: 2024 - 6 - 27,
      rating: 5,
      title: "Epic Adventure",
      content:
        "The Legend of Zelda is a masterpiece. The story, the puzzles, and the exploration make it an unforgettable experience.",
    }),
    createReview({
      review_date: 2024 - 6 - 29,
      rating: 5,
      title: "Revolutionary Shooter",
      content:
        "Half-Life revolutionized the FPS genre. The story, the gameplay, and the atmosphere are all top-notch.",
    }),
  ]);

  console.log(await fetchUsers());
  console.log(await fetchGames());
  console.log(await fetchReviewsByGameId);
  console.log("Games created");
};

init();

// Routes

app.get("/api/users", async (req, res, next) => {
  console.log("hit");
  try {
    res.send(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

app.get("/api/games", async (req, res, next) => {
  try {
    const games = await fetchGames();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
});

app.get("/api/games/:id", async (req, res, next) => {
  console.log("route hit");

  try {
    res.send(await fetchGame({ id: req.params.id }));
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

app.get("/api/games/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await fetchReviewsByGameId(req.params.id);
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

app.post("/api/games/:id/reviews", async (req, res, next) => {
  try {
    const { users_id, title, rating, content } = req.body;
    const newReview = await createReview({
      game_id: req.params.id,
      users_id,
      title,
      rating,
      content,
    });
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
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
