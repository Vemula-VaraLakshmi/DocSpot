import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">DocSpot</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="custom-hero">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">
          {/* Text Section */}
          <div className="hero-text text-white">
            <h1 className="fw-bold display-4">
              We're <span className="text-accent">determined</span> for your <span className="text-accent">better life.</span>
            </h1>
            <p className="mt-3 fs-5">
              You can get the care you need 24/7 – online or in person. You will be treated by caring, specialist doctors.
            </p>
            <Link to="/login" className="btn btn-light px-4 py-2 mt-4 fw-semibold shadow-sm">Make an Appointment</Link>
          </div>

          {/* Image Section */}
          <div className="hero-image mt-5 mt-md-0">
            <img src="/doctorteam.jpeg" alt="Healthcare team" className="img-fluid rounded-circle shadow-lg" />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2 className="fw-bold display-5 mb-4">About DocSpot</h2>
          <p className="lead mb-5 px-md-5">
            DocSpot is a modern healthcare appointment platform that connects patients and doctors effortlessly.
            We simplify medical consultations and enhance access to health services.
          </p>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card bg-light text-dark h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title text-primary">🔒 Secure Login</h5>
                  <p>Role-based access for patients and doctors with encrypted credentials.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-light text-dark h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title text-success">📅 Easy Booking</h5>
                  <p>Book appointments easily and upload relevant documents with full privacy.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-light text-dark h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title text-info">📋 Custom Dashboards</h5>
                  <p>Separate user-friendly dashboards for patients and doctors for easy management.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 text-white" style={{ backgroundColor: '#203a43' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5">Contact Us</h2>
            <p className="lead">We'd love to hear from you. Fill out the form and our team will get back to you.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card bg-light text-dark shadow-lg p-4 rounded-4">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="you@example.com" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="5" placeholder="Your message..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} DocSpot. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
