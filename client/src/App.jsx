import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import GameListPage from "./components/GameListPage";
import GameDetailPage from "./components/GameDetailPage";
import SubmitReviewPage from "./components/SubmitReviewPage";
import UserProfilePage from "./components/UserProfilePage";
import "./App.css";

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" exact component={HomePage} />
      <Route path="/games" component={GameListPage} />
      <Route path="/games/:id" component={GameDetailPage} />
      <Route path="/submit-review" component={SubmitReviewPage} />
      <Route path="/profile" component={UserProfilePage} />
    </Routes>
    <Footer />
  </div>
);

export default App;
