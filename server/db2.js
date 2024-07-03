const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/8-bit-game-reviews"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

const createTable = async () => {
  const SQL = `DROP TABLE IF EXISTS users CASCADE;
   DROP TABLE IF EXISTS games CASCADE; 
   DROP TABLE IF EXISTS reviews CASCADE; 
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    image_url TEXT
);
CREATE TABLE games (
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_date INT,
    developer VARCHAR(100),
    publisher VARCHAR(100),
    platform VARCHAR(250),
    genre VARCHAR(250),
    description TEXT,
    ESRB_Rating VARCHAR(10),
    image_url TEXT
    );
CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    game_id UUID REFERENCES games(id),
    users_id UUID REFERENCES users(id),
    review_date DATE,
    rating INT CHECK (rating >= 1 AND rating <= 10),
    title VARCHAR(100),
    content TEXT
);
   `;

  await client.query(SQL);
};

// create new user

const createUser = async ({
  username,
  email,
  password,
  join_date,
  image_url,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const SQL = `
    INSERT INTO users (id, username, email, password, join_date, image_url)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    email,
    hashedPassword,
    join_date,
    image_url,
  ]);
  return response.rows[0];
};

//create new game

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
  return response.rows[0];
};

//Create new review

const createReview = async ({ game_id, users_id, title, rating, content }) => {
  const SQL = `
    INSERT INTO reviews (id, game_id, users_id, title, rating, content)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    game_id,
    users_id,
    title,
    rating,
    content,
  ]);
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchGames = async () => {
  const SQL = `SELECT * FROM games`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchGame = async ({ id }) => {
  console.log("fetchGame route is hit");
  const SQL = `SELECT * FROM games WHERE id = $1`;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const fetchReviewsByGameId = async ({ game_id }) => {
  console.log("fetch review route is hit");
  const SQL = `SELECT * FROM reviews WHERE game_id = $1 ORDER BY review_date DESC;
  `;
  const response = await client.query(SQL, [game_id]);
  return response.rows[0];
};

module.exports = {
  client,
  createGame,
  createUser,
  createTable,
  fetchGames,
  fetchGame,
  createReview,
  fetchReviewsByGameId,
  fetchUsers,
};
