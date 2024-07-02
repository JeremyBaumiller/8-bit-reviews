import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const HomePage = ({ handleLogout }) => {
  useEffect(() => {
    // Initialize the carousel using Bootstrap's native JavaScript API
    const carouselElement = document.getElementById("gameCarousel");
    const bootstrapCarousel = new window.bootstrap.Carousel(carouselElement, {
      interval: 3000, // Set interval to 5 seconds
    });
  }, []);

  return (
    <div className="bg-dark text-light py-5">
      <div className="container">
        <h1 className="display-4">Welcome to 8-Bit-Reviews</h1>
        <h2 className="my-4">Favorites</h2>
        <style>
          {`
            .carousel-item img {
              width: 100%;
              height: 400px; /* Set a fixed height */
              object-fit: contain; /* Scale the image to cover the element's entire content box */
            }
          `}
        </style>
        <div
          id="gameCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ul className="carousel-indicators">
            <li
              data-bs-target="#gameCarousel"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="2"></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="3"></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="4"></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="5"></li>
            <li data-bs-target="#gameCarousel" data-bs-slide-to="6"></li>
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="covers/9.Chrono_Trigger.jpg"
                className="d-block w-100"
                alt="Game 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/10.Castlevania_SOTN_PAL.jpg"
                className="d-block w-100"
                alt="Game 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/13.Doom.jpg"
                className="d-block w-100"
                alt="Game 3"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/33.Super-Punch_Out.jpg"
                className="d-block w-100"
                alt="Game 4"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/34.MegaManX.jpg"
                className="d-block w-100"
                alt="Game 5"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/32.diable_II.jpg"
                className="d-block w-100"
                alt="Game 6"
              />
            </div>
            <div className="carousel-item">
              <img
                src="covers/30.TonyHawksProSkater.jpg"
                className="d-block w-100"
                alt="Game 7"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#gameCarousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#gameCarousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <p className="lead mt-3"></p>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
