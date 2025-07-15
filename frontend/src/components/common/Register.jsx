import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: '' // 'user' or 'admin'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        type: formData.type // ✅ Send as 'type' to backend
      };

      await axios.post('/user/register', payload);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Please try again.');
      console.error(err.response?.data || err.message);
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
          maxWidth: '500px',
          borderRadius: '12px',
          opacity: 0.95
        }}
      >
        <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
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
          <div className="mb-4">
            <label className="form-label">Register As</label>
            <select
              className="form-select"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="user">Patient</option>
              <option value="admin">Doctor</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-pill">
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-1">Already have an account?</p>
          <Link to="/login" className="btn btn-outline-primary w-100 mb-2">
            Login Here
          </Link>
          <Link to="/" className="btn btn-link text-decoration-none text-secondary">
            ← Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
