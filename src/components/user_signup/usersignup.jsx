import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Col, Row } from "react-bootstrap";
import "./user_signup.css";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    dob: "",
    phone_number: "",
    username: "",
    password: "",
    address: "",
    landmark: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/send-otp", {
        email: formData.email,
      });

      if (response.data.success) {
        setMessage("OTP sent to your email.");
        setIsError(false);
        setOtpSent(true);
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
      setIsError(true);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/verify-otp", {
        email: formData.email,
        otp,
      });

      if (response.data.success) {
        setMessage("Email verified successfully!");
        setIsError(false);
        setIsEmailVerified(true);
        setOtpSent(false);
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage("Failed to verify OTP. Please try again.");
      setIsError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/user_signup", formData);

      if (response.data.success) {
        setMessage("Signup successful!");
        setIsError(false);
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsError(true);
    }
  };

  return (
    <Container className="signup-container mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
          <h3>User Signup</h3>

          {!isEmailVerified ? (
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
              </Form.Group>
              {!otpSent ? (
                <Button className="mt-3" variant="primary" onClick={handleEmailVerification}>
                  Verify Email
                </Button>
              ) : (
                <>
                  <Form.Group controlId="otp" className="mt-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button className="mt-3" variant="success" onClick={handleOtpVerification}>
                    Submit OTP
                  </Button>
                </>
              )}
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  readOnly
                />
              </Form.Group>
              {/* Rest of the Form Fields */}
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserSignup;
