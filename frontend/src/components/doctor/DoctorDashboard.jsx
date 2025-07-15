import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: '',
    profileImage: null,
  });

  const doctor = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, profileRes] = await Promise.all([
          axios.get(`/doctor/appointments/${doctor.id}`),
          axios.get(`/doctor/profile/${doctor.id}`)
        ]);

        setAppointments(apptRes.data);
        const doc = profileRes.data;
        setFormData({
          fullname: doc.fullname || '',
          phone: doc.phone || '',
          specialization: doc.specialization || '',
          experience: doc.experience || '',
          fees: doc.fees || '',
          timings: (doc.timings || []).join(', '),
          profileImage: null,
        });
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [doctor.id]);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "timings") {
        value.split(",").map(t => data.append("timings", t.trim()));
      } else if (value) {
        data.append(key, value);
      }
    });

    try {
      await axios.put(`/doctor/update/${doctor.id}`, data);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">
        <h2 className="text-center text-primary fw-bold mb-4">
          Welcome, Dr. {doctor.name}
        </h2>

        <h4 className="mb-3">Upcoming Appointments</h4>
        {appointments.length === 0 ? (
          <p className="text-muted">No upcoming appointments.</p>
        ) : (
          <div className="row">
            {appointments.map((app, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{app.userInfo.name}</h5>
                    <p><strong>Email:</strong> {app.userInfo.email}</p>
                    <p><strong>Date:</strong> {new Date(app.date).toLocaleString()}</p>
                    {app.document && (
                      <a href={`/uploads/${app.document}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info">
                        View Document
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="my-5" />

        <h4 className="mb-4">Update Profile</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-4 shadow rounded">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Specialization</label>
              <input type="text" name="specialization" className="form-control" value={formData.specialization} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Experience (years)</label>
              <input type="text" name="experience" className="form-control" value={formData.experience} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Fees (INR)</label>
              <input type="number" name="fees" className="form-control" value={formData.fees} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Phone</label>
              <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Timings</label>
              <input type="text" name="timings" placeholder="e.g., 9:00 AM - 12:00 PM, 4:00 PM - 6:00 PM" className="form-control" value={formData.timings} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Upload Profile Picture</label>
              <input type="file" name="profileImage" className="form-control" onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorDashboard;
