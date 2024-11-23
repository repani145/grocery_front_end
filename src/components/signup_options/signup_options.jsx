// SignupOptions.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './signup_options.css'

function SignupOptions({ onSelectOption }) {
  return (
    <Container className="signup-option-container d-flex align-items-center justify-content-center vh-100">
  <Row className="w-100">
    <Col md={6} lg={5} className="mb-4 mx-auto" >
      <Card className="text-center shadow-sm">
        {/* <Card.Body style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHNkiRIUL6CCNjHaAt_jmibXJqpFlkhHokQ&s')",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}> */}
        <Card.Body>
          <Card.Title>User Signup</Card.Title>
          <Card.Text>
            Register as a user to access personalized features and explore more options.
          </Card.Text>
          <Button onClick={() => onSelectOption('UserSignup')} variant="primary">
            User Register
          </Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} lg={5} className="mb-4 mx-auto">
      <Card className="text-center shadow-sm">
        {/* <Card.Body style={{backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundImage:"url('data:image/png;base64,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')"}}> */}
        <Card.Body>
          <Card.Title>Vendor Signup</Card.Title>
          <Card.Text>
            Register your shop with us and reach more customers by joining our platform.
          </Card.Text>
          <Button onClick={() => onSelectOption('VendorSignup')} variant="primary">
            Shop Register
          </Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
}

export default SignupOptions;
