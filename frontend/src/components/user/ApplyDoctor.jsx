import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from 'react-bootstrap';

const ApplyDoctor = () => {
  const { state } = useLocation();
  const doctor = state?.doctor;

  const [date, setDate] = useState('');
  const [document, setDocument] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const formData = new FormData();
    formData.append('doctorId', doctor._id);
    formData.append('date', date);
    formData.append('document', document);
    formData.append('userInfo', JSON.stringify(user));
    formData.append('doctorInfo', JSON.stringify(doctor));

    try {
      await axios.post('/user/book', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setError('');
      setDate('');
      setDocument(null);
    } catch (err) {
      setError('Booking failed. Try again.');
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">
                Book Appointment with Dr. {doctor?.fullname}
              </h3>

              {success && <Alert variant="success">Appointment booked successfully!</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Document (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setDocument(e.target.files[0])}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Confirm Appointment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyDoctor;
