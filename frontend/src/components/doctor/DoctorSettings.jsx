import React, { useState, useEffect } from "react";
import axios from "../../axios";

const DoctorSettings = () => {
  const doctor = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: [],
    profileImage: null,
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await axios.get(`/doctor/profile/${doctor.id}`);
      setFormData({
        ...formData,
        ...res.data,
        timings: res.data.timings || [],
      });
    };
    fetchDoctor();
  }, []);

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
    Object.keys(formData).forEach((key) => {
      if (key === "timings") {
        formData.timings.forEach((t) => data.append("timings", t));
      } else {
        data.append(key, formData[key]);
      }
    });

    await axios.put(`/doctor/update/${doctor.id}`, data);
    alert("Profile updated!");
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Update Profile</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input type="text" name="fullname" className="form-control"
              value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input type="text" name="phone" className="form-control"
              value={formData.phone} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Specialization</label>
            <input type="text" name="specialization" className="form-control"
              value={formData.specialization} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Experience</label>
            <input type="text" name="experience" className="form-control"
              value={formData.experience} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Fees</label>
            <input type="number" name="fees" className="form-control"
              value={formData.fees} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Timings (comma separated)</label>
            <input type="text" name="timings" className="form-control"
              value={formData.timings.join(",")} onChange={(e) => setFormData({ ...formData, timings: e.target.value.split(",") })} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Upload Profile Image</label>
            <input type="file" name="profileImage" className="form-control"
              onChange={handleChange} />
          </div>
        </div>
        <button className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
};

export default DoctorSettings;
