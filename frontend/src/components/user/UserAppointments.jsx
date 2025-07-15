import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`/user/appointments/${user._id}`);
      setAppointments(res.data);
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="container mt-5">
      <h3>Your Appointments</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i}>
              <td>{a.date}</td>
              <td>{a.doctorInfo?.name}</td>
              <td>{a.status || 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointments;
