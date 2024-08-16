import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './shared.css';

const HomePage = () => (
  <div className="home-page">
    <header className="header">
      <div className="container">
        <h1>Welcome to HealthFlow</h1>
        <nav>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </nav>
      </div>
    </header>
    <main className="main-content">
      <div className="container">
        <h2>Your Health Insights Await</h2>
        <p>Get personalized health insights and tips to stay on top of your well-being.</p>
        <Link to="/register" className="btn">Get Started</Link>
      </div>
    </main>
  </div>
);

export default HomePage;