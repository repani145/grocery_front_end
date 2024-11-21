// VendorSignup.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LandNavbar from '../landNav/landNav';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth/userAuth';
import './vendor_sign.css'

const baseUrl = 'http://127.0.0.1:5000';

const VendorSignup = () => {
  const { accessToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    phoneNumber: '',
    username: '',
    shopImage: null,
    password: '',
    address: '',
    landmark: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      shopImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('shop_name', formData.shopName);
    data.append('email', formData.email);
    data.append('phone_number', formData.phoneNumber);
    data.append('username', formData.username);
    data.append('password', formData.password);
    data.append('address', formData.address);
    data.append('landmark', formData.landmark);
    data.append('image', formData.shopImage); // Attach the file

    try {
      const response = await axios.post(`${baseUrl}/vendor_signup`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        },
      });
      if (response.data.success ==1){
        // alert('Registered successfully')
        setSuccessMessage('Registered successfully')
      }
      console.log('Signup successful:', response.data);
      // Handle success (e.g., navigate to another page or show success message)
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage(error)
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <>
      <Container className="signup-form-container d-flex align-items-center justify-content-center mt-5">
  <Row className="w-100">
    <Col md={8} lg={6} className="mx-auto">
      <h2 className="text-center mb-4">Vendor Signup</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form Groups */}
        <Form.Group controlId="shopName" className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" placeholder="Enter shop name" value={formData.shopName} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="shopImage" className="mb-3">
              <Form.Label>Shop Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" value={formData.address} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="landmark" className="mb-3">
              <Form.Label>Landmark</Form.Label>
              <Form.Control type="text" placeholder="Enter landmark" value={formData.landmark} onChange={handleChange} />
            </Form.Group>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <Button variant="primary" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </Col>
  </Row>
</Container>

    </>
  );
};

export default VendorSignup;

