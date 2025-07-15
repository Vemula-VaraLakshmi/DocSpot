import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/user/login', formData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    // Role-based redirection
    const userType = res.data.user.type;
    if (userType === 'admin') navigate('/admin/home');
    else if (userType === 'doctor') navigate('/doctor/home');
    else navigate('/user/home');

  } catch (err) {
    alert('Invalid credentials');
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/doc.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        padding: '20px'
      }}
    >
      <div
        className="card shadow-lg p-5 bg-white"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          opacity: 0.95
        }}
      >
        <h3 className="text-center mb-4 text-primary">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-primary w-100 mb-2">Register Here</Link>
          <Link to="/" className="btn btn-link text-decoration-none text-secondary">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
