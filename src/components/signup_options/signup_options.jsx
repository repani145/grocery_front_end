// SignupOptions.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './signup_options.css'

function SignupOptions({ onSelectOption }) {
  return (
    <Container className="signup-option-container d-flex align-items-center justify-content-center vh-100">
  <Row className="w-100">
    <Col md={6} lg={5} className="mb-4 mx-auto">
      <Card className="text-center shadow-sm">
        <Card.Body>
          <Card.Title>User Signup</Card.Title>
          <Card.Text>
            Register as a user to access personalized features and explore more options.
          </Card.Text>
          <Button onClick={() => onSelectOption('UserSignup')} variant="primary">
            User SignUp
          </Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} lg={5} className="mb-4 mx-auto">
      <Card className="text-center shadow-sm">
        <Card.Body>
          <Card.Title>Vendor Signup</Card.Title>
          <Card.Text>
            Register your shop with us and reach more customers by joining our platform.
          </Card.Text>
          <Button onClick={() => onSelectOption('VendorSignup')} variant="primary">
            Sign Up as Vendor
          </Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
}

export default SignupOptions;
