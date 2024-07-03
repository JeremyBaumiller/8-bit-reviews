8-bit-reviews
Welcome to 8-bit-reviews! This application allows users to browse, review, and rate their favorite retro games. The site pulls game information from a static API and provides an intuitive interface for users to explore game details and share their thoughts.

Table of Contents
Features
Installation
Usage
API Endpoints
Contributing
License
Features
Browse a curated list of retro games.
View detailed information about each game, including title, genre, release date, and more.
Read and write reviews for your favorite games.
Rate games and see average ratings.
User authentication for posting reviews.
Installation
To get started with 8-bit-reviews, follow these steps:

Clone the repository:

sh
Copy code
git clone https://github.com/your-username/8-bit-reviews.git
Navigate to the project directory:

sh
Copy code
cd 8-bit-reviews
Install dependencies:

sh
Copy code
npm install
Run the application:

sh
Copy code
npm start
The application should now be running on http://localhost:3000.

Usage
Browsing Games
Navigate to the home page to see a list of available retro games.
Click on a game to view its details, including description, release date, genre, and more.
Reviewing and Rating
Log in or sign up to post reviews and rate games.
On the game detail page, submit your review and rating.
Read reviews from other users to see what they think about the game.
API Endpoints
The application pulls game data from a static API. Below are the key endpoints used:

GET /api/games

Retrieves a list of all games.
Example response:
json
Copy code
[
  {
    "id": 1,
    "title": "Super Mario Bros.",
    "genre": "Platformer",
    "release_date": "1985-09-13",
    "description": "A classic platformer game by Nintendo.",
    "image_url": "https://example.com/super-mario-bros.jpg"
  },
  ...
]
GET /api/games/

Retrieves detailed information about a specific game.
Example response:
json
Copy code
{
  "id": 1,
  "title": "Super Mario Bros.",
  "genre": "Platformer",
  "release_date": "1985-09-13",
  "description": "A classic platformer game by Nintendo.",
  "image_url": "https://example.com/super-mario-bros.jpg"
}
POST /api/reviews

Submits a new review for a game.
Request body example:
json
Copy code
{
  "game_id": 1,
  "user_id": 123,
  "rating": 5,
  "review": "An all-time classic!"
}
Contributing
We welcome contributions to improve 8-bit-reviews! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch with your feature or bugfix.
Make your changes and commit them.
Push your changes to your fork.
Open a pull request to the main repository.
License
This project is licensed under the MIT License. See the LICENSE file for details.
