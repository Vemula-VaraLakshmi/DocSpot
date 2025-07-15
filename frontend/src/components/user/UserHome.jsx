import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import './UserHome.css';

const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const doctorRes = await axios.get('/doctor/list');
      console.log("👩‍⚕️ Doctors Fetched:", doctorRes.data); // 🧠 Log here

      const user = JSON.parse(localStorage.getItem('user'));
      const notifyRes = await axios.get(`/user/notifications/${user?.id}`);
      console.log("🔔 Notifications Fetched:", notifyRes.data); // 🧠 Log here

      setDoctors(doctorRes.data);
      setNotifications(notifyRes.data);
    } catch (err) {
      console.log(err)
      console.error("❌ Failed to fetch doctors or notifications:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);


  const showGoBack = location?.state?.from || false;

  return (
    <div className="user-home-wrapper">
      {/* Header */}
      <div className="user-home-header text-white d-flex align-items-center">
        <Container className="text-center">
          <h1 className="fw-bold display-4">Welcome to Your Dashboard</h1>
          <p className="lead">Explore doctors, book appointments, and manage your health journey effortlessly.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
            <Link to="/user/appointments" className="btn btn-light px-4 py-2 shadow-sm">My Appointments</Link>
            <Button variant="outline-light" onClick={() => navigate('/')}>Go to Home</Button>
            <Button variant="danger" onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}>Logout</Button>
          </div>

          {showGoBack && (
            <div className="mt-3">
              <Button variant="warning" onClick={() => navigate(-1)}>← Go Back</Button>
            </div>
          )}
        </Container>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Container className="my-4">
          <h5 className="text-primary mb-3">Notifications</h5>
          {notifications.map((note, idx) => (
            <Alert key={idx} variant="info" className="shadow-sm">
              {note.message}
            </Alert>
          ))}
        </Container>
      )}

      {/* Doctors Section */}
      <Container className="my-5">
        <h3 className="text-center mb-4 text-primary fw-bold">Available Doctors</h3>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-muted">No doctors found at the moment.</p>
        ) : (
          <Row>
            {doctors.map(doc => (
              <Col md={6} lg={4} sm={12} className="mb-4" key={doc._id}>
                <Card className="h-100 shadow-sm text-center">
                  {doc.profileImage && (
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5000/uploads/${doc.profileImage}`}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{doc.fullname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{doc.specialization}</Card.Subtitle>
                    <Card.Text>
                      <strong>Experience:</strong> {doc.experience} years<br />
                      <strong>Fees:</strong> ₹{doc.fees}<br />
                      <strong>Timings:</strong> {doc.timings?.length ? doc.timings.join(" - ") : "Not Available"}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() =>
                        navigate('/user/apply', {
                          state: { doctor: doc, from: 'user/home' }
                        })
                      }
                    >
                      Book Appointment
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center bg-dark text-white py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} DocSpot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
