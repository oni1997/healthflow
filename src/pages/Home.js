import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="home-page">
    <header className="header">
      <h1>Welcome to HealthFlow</h1>
      <nav>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </nav>
    </header>
    <main className="main-content">
      <h2>Your Health Insights Await</h2>
      <p>Get personalized health insights and tips to stay on top of your well-being.</p>
    </main>
  </div>
);

export default HomePage;
