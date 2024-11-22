import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth/userAuth";
import "./vendor_sign.css";
import { baseUrl } from "../../urls/urls";

const VendorSignup = () => {
  const { accessToken } = useAuth();
  const [stage, setStage] = useState("email"); // Stages: email, otp, verified
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    shopName: "",
    phoneNumber: "",
    username: "",
    shopImage: null,
    password: "",
    address: "",
    landmark: "",
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

  // Send OTP to email
  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/send-otp`, { email: formData.email });
      if (response.data.success) {
        setStage("otp");
        setSuccessMessage("OTP sent to your email. Please check your inbox.");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });
      if (response.data.success) {
        setStage("verified");
        setSuccessMessage("Email verified successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Error verifying OTP.");
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("shop_name", formData.shopName);
    data.append("email", formData.email);
    data.append("phone_number", formData.phoneNumber);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("landmark", formData.landmark);
    data.append("image", formData.shopImage);

    try {
      const response = await axios.post(`${baseUrl}/vendor_signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setSuccessMessage("Registered successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Error during signup.");
    }
  };

  return (
    <>

      <Container className="signup-form-container d-flex align-items-center justify-content-center mt-5">
        <Row className="w-100">
          <Col md={8} lg={6} className="mx-auto">
            <h2 className="text-center mb-4">Vendor Signup</h2>
            <Form>
              {stage === "email" && (
                <>
                  {errorMessage && (
                    <div className="alert alert-danger text-center mb-3">{errorMessage}</div>
                  )}
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSendOtp} className="w-100">
                    Send OTP
                  </Button> <br/><br/>
                </>
              )}

              {stage === "otp" && (
                <>
                  {errorMessage && (
                    <div className="alert alert-danger text-center mb-3">{errorMessage}</div>
                  )}
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formData.email} disabled />
                  </Form.Group>
                  <Form.Group controlId="otp" className="mb-3">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleVerifyOtp} className="w-100 mb-2">
                    Verify OTP
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setStage("email");
                      setFormData((prevData) => ({ ...prevData, otp: "" }));
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="w-100"
                  >
                    Change Email
                  </Button>
                  <br/><br/>
                </>
              )}


              {stage === "verified" && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formData.email} disabled />
                  </Form.Group>

                  <Form.Group controlId="shopName" className="mb-3">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter shop name"
                      value={formData.shopName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="phoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="shopImage" className="mb-3">
                    <Form.Label>Shop Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="landmark" className="mb-3">
                    <Form.Label>Landmark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  <Button variant="primary" type="submit" className="w-100">
                    Signup
                  </Button>
                </Form>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VendorSignup;
