import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Col, Row } from "react-bootstrap";
import "./vendor_sign.css";
import LandNavbar from "../landNav/landNav";
import Footor from "../LandFooter/landFooter";
import { baseUrl } from "../../urls/urls";
import PrizeBlastModal from "../blast-text/blast_text";
import { Navigate } from "react-router-dom";

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    shop_name: "",
    phone_number: "",
    username: "",
    image: null,
    password: "",
    address: "",
    landmark: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  //for successful signup popUp
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        Navigate('/signup');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post(`${baseUrl}/send-otp`, {
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
      const response = await axios.post(`${baseUrl}/verify-otp`, {
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      shopImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("shop_name", formData.shop_name);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("landmark", formData.landmark);
    data.append("image", formData.image); // Append image file
  
    try {
      const response = await axios.post(`${baseUrl}/vendor_signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        setMessage("Signup successful!");
        setShowModal(true);
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
    <>
      <LandNavbar />
      <Container className="signup-container mt-5" >
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
            <h3>Vendor Signup</h3>

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
                    <Button
                      className="mt-3"
                      variant="secondary"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                        setFormData((prevData) => ({ ...prevData, email: "" }));
                        setMessage("");
                        setIsError(false);
                      }}
                    >
                      Change Email
                    </Button>
                  </>
                )}
              </Form>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formData.email} disabled />
                </Form.Group>

                <Form.Group controlId="shop_name">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="shop_name"
                    value={formData.shop_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Shop Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setFormData((prevData) => ({
                      ...prevData,
                      image: e.target.files[0]
                    }))}
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

                <Button variant="primary" type="submit" className="w-100">
                  Signup
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      <br /><br /><br />
      {
        showModal && <PrizeBlastModal handleCloseModal={handleCloseModal} showModal={showModal} blast_text={"SignUp is successfully !"} />
      }
      <Footor />
    </>
  );
};

export default VendorSignup;
