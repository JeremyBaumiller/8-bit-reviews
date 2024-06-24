import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GameListPage from "./components/GameListPage";
import GameDetailPage from "./components/GameDetailPage";
import SubmitReviewPage from "./components/SubmitReviewPage";
import UserProfilePage from "./components/UserProfilePage";
import "./App.css";

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GameListPage />} />
      <Route path="/games/:id" element={<GameDetailPage />} />
      <Route path="/submit-review" element={<SubmitReviewPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
