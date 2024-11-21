// UserSignup.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Col, Row } from 'react-bootstrap';
import './user_signup.css'

const UserSignup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    email: '',
    phone_number: '',
    username: '',
    password: '',
    address: '',
    landmark: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000//user_signup', formData);

      if (response.data.success === 1) {
        setMessage('Signup successful!');
        setIsError(false);
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }
  };

  return (
    <Container className="signup-container mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          {message && (
            <Alert variant={isError ? 'danger' : 'success'}>{message}</Alert>
          )}
          <h3>User Signup</h3>
          <Form onSubmit={handleSubmit}>
            {/* Form Groups */}
            <Form.Group controlId="full_name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="landmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>



  );
};

export default UserSignup;

