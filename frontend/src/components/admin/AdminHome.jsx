import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Manage Appointments</Card.Title>
              <Card.Text>View and manage all appointment requests.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/admin/appointments')} className="w-100">
                View Appointments
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Manage Doctors</Card.Title>
              <Card.Text>Approve or reject doctor applications.</Card.Text>
              <Button variant="success" onClick={() => navigate('/admin/doctors')} className="w-100">
                Manage Doctors
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Logout</Card.Title>
              <Card.Text>End your session securely.</Card.Text>
              <Button variant="danger" onClick={handleLogout} className="w-100">
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
