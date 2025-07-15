import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Container, Table, Spinner } from 'react-bootstrap';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/admin/appointments');
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="mb-4">All Appointments</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt._id}>
                <td>{appt.userInfo?.name}</td>
                <td>{appt.doctorInfo?.fullname}</td>
                <td>{new Date(appt.date).toLocaleString()}</td>
                <td>
                  {appt.document ? (
                    <a href={`/uploads/${appt.document}`} target="_blank" rel="noreferrer">View</a>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ManageAppointments;
