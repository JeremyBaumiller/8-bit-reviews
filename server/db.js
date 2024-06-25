const createTable = async () => {
  const SQL = `drop table if exists user;
   drop table if exists games; 
   drop table if exists reviews;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
)
CREATE TABLE Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_date DATE,
    developer VARCHAR(100),
    publisher VARCHAR(100),
    platform VARCHAR(50),
    genre VARCHAR(50),
    description TEXT
)
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
