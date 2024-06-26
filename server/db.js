const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgress://localhost/8-bit-game-reviews"
);

const uuid = require("uuid");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { response } = require("express");
const JWT = process.env.JWT || "shhh";

const createTable = async () => {
  const SQL = `DROP TABLE IF EXISTS users;
   DROP TABLE IF EXISTS games; 
   DROP TABLE IF EXISTS reviews;
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
)
CREATE TABLE games (
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_date DATE,
    developer VARCHAR(100),
    publisher VARCHAR(100),
    platform VARCHAR(50),
    genre VARCHAR(50),
    description TEXT,
    ESRB_Rating VARCHAR(5),
    image_url VARCHAR(255) );
INSERT INTO Games (id, title, release_date, developer, publisher, platform, genre, description, esrb_rating, image_url) VALUES
(1, 'Super Mario Bros.', 1985, 'Nintendo', 'Nintendo', 'NES', 'Platformer', 'Super Mario Bros. is a classic platformer where players control Mario as he navigates the Mushroom Kingdom to rescue Princess Toadstool from Bowser.', 'E', 8-bit-reviews/client/public/covers/1.mario.jpg),
(2, 'The Legend of Zelda', 1986, 'Nintendo', 'Nintendo', 'NES', 'Action-Adventure', 'The Legend of Zelda follows Link as he embarks on a quest to rescue Princess Zelda and defeat the evil Ganon by exploring dungeons and solving puzzles.', 'E', 8-bit-reviews/client/public/covers/2.zelda.jpg),
(3, 'Sonic the Hedgehog', 1991, 'Sega', 'Sega', 'Sega Genesis', 'Platformer', 'Sonic the Hedgehog introduces Sonic, a speedy blue hedgehog, in his quest to stop the evil Dr. Robotnik from taking over the world.', 'E', 8-bit-reviews/client/public/covers/3.Sonic.jpg),
(4, 'Donkey Kong', 1981, 'Nintendo', 'Nintendo', 'Arcade', 'Platformer', 'Donkey Kong is an arcade classic where players control Jumpman (Mario) to rescue Pauline from Donkey Kong.', 'E', 8-bit-reviews/client/public/covers/4.Donkey_Kong.jpg),
(5, 'Pac-Man', 1980, 'Namco', 'Namco', 'Arcade', 'Puzzle', 'Pac-Man is a classic arcade game where players control Pac-Man to eat pellets and avoid ghosts.', 'E', 8-bit-reviews/client/public/covers/5.pac-man.jpg),
(6, 'Street Fighter II', 1991, 'Capcom', 'Capcom', 'Arcade', 'Fighting', 'Street Fighter II is a popular fighting game featuring iconic characters battling against each other in competitive matches.', 'T', 8-bit-reviews/client/public/covers/6.street_fighter_II.jpg),
(7, 'Mega Man 2', 1988, 'Capcom', 'Capcom', 'NES', 'Platformer', 'Mega Man 2 follows Mega Man in his quest to defeat Dr. Wily and his Robot Masters using various weapons obtained from defeated bosses.', 'E', 8-bit-reviews/client/public/covers/7.Megaman2.jpg),
(8, 'Final Fantasy VII', 1997, 'Square', 'Square', 'PlayStation', 'RPG', 'Final Fantasy VII is an epic RPG where players control Cloud Strife and his allies to stop the villain Sephiroth from destroying the world.', 'T', 8-bit-reviews/client/public/covers/8.Final_Fantasy_VII.jpg),
(9, 'Chrono Trigger', 1995, 'Square', 'Square', 'SNES', 'RPG', 'Chrono Trigger follows Crono and his friends as they travel through time to prevent a global catastrophe orchestrated by the powerful Lavos.', 'E', 8-bit-reviews/client/public/covers/9.Chrono_Trigger.jpg),
(10, 'Castlevania: Symphony of the Night', 1997, 'Konami', 'Konami', 'PlayStation', 'Action-Adventure', 'Castlevania: Symphony of the Night stars Alucard as he explores Dracula\'s castle to uncover secrets and defeat powerful creatures.', 'T', 8-bit-reviews/client/public/covers/10.Castlevania_SOTN_PAL.jpg),
(11, 'Super Metroid', 1994, 'Nintendo', 'Nintendo', 'SNES', 'Action-Adventure', 'Super Metroid follows Samus Aran in her mission to rescue the baby Metroid from the Space Pirates and Mother Brain on planet Zebes.', 'E', 8-bit-reviews/client/public/covers/11.Smetroid.jpg),
(12, 'Half-Life', 1998, 'Valve', 'Sierra Studios', 'PC', 'FPS', 'Half-Life is a groundbreaking FPS where players assume the role of Gordon Freeman as he battles aliens and government soldiers in the Black Mesa Research Facility.', 'M', 8-bit-reviews/client/public/covers/12.Half-Life.jpg),
(13, 'Doom', 1993, 'id Software', 'id Software', 'PC', 'FPS', 'Doom is a pioneering FPS game where players fight against demons from Hell on Mars as the unnamed space marine, known as Doomguy.', 'M', 8-bit-reviews/client/public/covers/13.Doom.jpg),
(14, 'The Secret of Monkey Island', 1990, 'Lucasfilm Games', 'Lucasfilm Games', 'PC', 'Adventure', 'The Secret of Monkey Island follows Guybrush Threepwood as he seeks to become a pirate and rescue the governor from the ghost pirate LeChuck.', 'E', 8-bit-reviews/client/public/covers/14.The_Secret_of_Monkey_Island.jpg),
(15, 'Metroid', 1986, 'Nintendo', 'Nintendo', 'NES', 'Action-Adventure', 'Metroid introduces players to Samus Aran as she explores the planet Zebes to eradicate the Space Pirates and Mother Brain.', 'E', 8-bit-reviews/client/public/covers/15.Metroid.jpg),
(16, 'EarthBound', 1994, 'HAL Laboratory', 'Nintendo', 'SNES', 'RPG', 'EarthBound follows Ness and his friends as they embark on a journey to stop the alien Giygas from taking over the world using psychic powers and humor.', 'E', 8-bit-reviews/client/public/covers/16.EarthBound.jpg),
(17, 'Star Fox', 1993, 'Nintendo', 'Nintendo', 'SNES', 'Rail Shooter', 'Star Fox is a rail shooter where players control Fox McCloud and his team of anthropomorphic animals in spacecrafts to defend the Lylat system from Andross.', 'E', 8-bit-reviews/client/public/covers/17.Star_Fox.jpg),
(18, 'Kirby\'s Adventure', 1993, 'HAL Laboratory', 'Nintendo', 'NES', 'Platformer', 'Kirby\'s Adventure stars Kirby, a pink puffball with the ability to inhale enemies and gain their powers, on a quest to restore the Star Rod and save Dream Land from darkness.', 'E', 8-bit-reviews/client/public/covers/18.Kirby_Adventure.jpg),
(19, 'Contra', 1987, 'Konami', 'Konami', 'NES', 'Run and Gun', 'Contra is a run-and-gun game where players control soldiers Bill and Lance in their mission to thwart an alien invasion by destroying enemy forces and bosses.', 'E', 8-bit-reviews/client/public/covers/19.Contra.jpg),
(20, 'Duck Hunt', 1984, 'Nintendo', 'Nintendo', 'NES', 'Light Gun Shooter', 'Duck Hunt is a light gun shooter where players use the NES Zapper to shoot ducks and clay pigeons as they appear on the screen.', 'E', 8-bit-reviews/client/public/covers/20.DuckHunt.jpg),
(21, 'Tetris', 1984, 'Elorg', 'Nintendo', 'Multiple', 'Puzzle', 'Tetris is a tile-matching puzzle game where players rotate and arrange falling tetrominoes to create complete lines and prevent the stack from reaching the top of the screen.', 'E', 8-bit-reviews/client/public/covers/21.Tetris.jpg),
(22, 'Mortal Kombat', 1992, 'Midway', 'Acclaim Entertainment', 'Arcade', 'Fighting', 'Mortal Kombat is a fighting game known for its brutal combat and fatalities as players choose iconic fighters to battle in a tournament for supremacy.', 'M', 8-bit-reviews/client/public/covers/22.Mortal_Kombat.jpg),
(23, 'Resident Evil', 1996, 'Capcom', 'Capcom', 'PlayStation', 'Survival Horror', 'Resident Evil follows Chris Redfield and Jill Valentine of S.T.A.R.S. as they investigate a mansion filled with zombies and uncover the Umbrella Corporation\'s sinister experiments.', 'M', 8-bit-reviews/client/public/covers/23.resident_evil.jpg),
(24, 'Pokemon Red/Blue', 1996, 'Game Freak', 'Nintendo', 'Game Boy', 'RPG', 'Pokemon Red/Blue tasks players with becoming a Pokemon Trainer, capturing and training Pokemon to become the Pokemon Champion while thwarting Team Rocket\'s evil plans.', 'E', 8-bit-reviews/client/public/covers/24.pokemon_red_version.jpg),
(25, 'GoldenEye 007', 1997, 'Rare', 'Nintendo', 'Nintendo 64', 'FPS', 'GoldenEye 007 is an FPS where players assume the role of James Bond in a mission to stop a criminal syndicate from using a satellite weapon to destroy London.', 'T', 8-bit-reviews/client/public/covers/25.goldeneye.jpg),
(26, 'The Legend of Zelda: Ocarina of Time', 1998, 'Nintendo', 'Nintendo', 'Nintendo 64', 'Action-Adventure', 'The Legend of Zelda: Ocarina of Time follows Link as he travels through time to stop Ganondorf from obtaining the Triforce and conquering the kingdom of Hyrule.', 'E', 8-bit-reviews/client/public/covers/26.zelda_64.jpg),
(27, 'Gran Turismo', 1997, 'Polyphony Digital', 'Sony Computer Entertainment', 'PlayStation', 'Racing', 'Gran Turismo is a racing simulator where players compete in various races and challenges to earn credits and unlock new cars for their collection.', 'E', 8-bit-reviews/client/public/covers/27.Gran_Turismo.jpg),
(28, 'Metal Gear Solid', 1998, 'Konami', 'Konami', 'PlayStation', 'Stealth Action', 'Metal Gear Solid follows Solid Snake as he infiltrates a nuclear weapons facility to neutralize terrorists threatening to launch a nuclear strike.', 'M', 8-bit-reviews/client/public/covers/28.metal_gear_solid.jpg),
(29, 'Crash Bandicoot', 1996, 'Naughty Dog', 'Sony Computer Entertainment', 'PlayStation', 'Platformer', 'Crash Bandicoot stars Crash in his quest to rescue his girlfriend Tawna and thwart the evil plans of Dr. Neo Cortex by traversing various levels and defeating enemies.', 'E', 8-bit-reviews/client/public/covers/29.crash_bandicoot.jpg),
(30, 'Tony Hawk\'s Pro Skater', 1999, 'Neversoft', 'Activision', 'PlayStation', 'Sports', 'Tony Hawk\'s Pro Skater allows players to skate as legendary skateboarders in various locations, performing tricks and completing objectives to earn points and unlock new content.', 'T', 8-bit-reviews/client/public/covers/30.TonyHawksProSkater.jpg),
(31, 'StarCraft', 1998, 'Blizzard Entertainment', 'Blizzard Entertainment', 'PC', 'RTS', 'StarCraft is a real-time strategy game where players control one of three factions in a war for dominance across the galaxy by gathering resources, building bases, and commanding armies.', 'T', 8-bit-reviews/client/public/covers/31.StarCraft.jpg),
(32, 'Diablo II', 2000, 'Blizzard Entertainment', 'Blizzard Entertainment', 'PC', 'Action RPG', 'Diablo II is an action RPG where players embark on a quest to defeat the Lord of Terror, Diablo, by exploring dungeons, collecting loot, and battling hordes of monsters.', 'M', 8-bit-reviews/client/public/covers/32.diable_II.jpg);
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    review_date DATE NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 10),
    title VARCHAR(100),
    content TEXT,
    FOREIGN KEY (game_id) REFERENCES Games(game_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
)
   `;
};

const createGame = async ({
  title,
  release_date,
  developer,
  publisher,
  platform,
  genre,
  description,
  ESRB_Rating,
  image_url,
}) => {
  const SQL = `INSERT INTO games (id, title, release_date, developer, publisher, platform, genre, description, ESRB_Rating, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * `;
  const response = await client.query(SQL, [
    uuid.v4(),
    title,
    release_date,
    developer,
    publisher,
    platform,
    genre,
    description,
    ESRB_Rating,
    image_url,
  ]);
};

const fetchGames = async () => {
  const SQL = `SELECT * FROM games`;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = { client, createGame, createTable, fetchGames };
