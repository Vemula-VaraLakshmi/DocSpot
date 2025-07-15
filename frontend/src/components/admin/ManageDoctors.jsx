import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/admin/doctors');
      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.post(`/admin/doctors/status/${id}`, { status });
      fetchDoctors();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4">Doctor Applications</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {doctors.map(doc => (
            <Col md={4} className="mb-4" key={doc._id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{doc.fullname}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doc.specialization}</Card.Subtitle>
                  <Card.Text>
                    <strong>Email:</strong> {doc.email}<br />
                    <strong>Experience:</strong> {doc.experience} years<br />
                    <strong>Fees:</strong> ₹{doc.fees}
                  </Card.Text>
                  <p>Status: <strong>{doc.status}</strong></p>
                  {doc.status === 'pending' && (
                    <>
                      <Button variant="success" className="me-2" onClick={() => updateStatus(doc._id, 'approved')}>Approve</Button>
                      <Button variant="danger" onClick={() => updateStatus(doc._id, 'rejected')}>Reject</Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ManageDoctors;
