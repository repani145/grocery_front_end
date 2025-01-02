// Login.js
// import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import LandNavbar from '../../components/landNav/landNav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from '../../hooks/useAuth/userAuth';
import { useNavigate } from 'react-router-dom';
import Footor from '../../components/LandFooter/landFooter';
import { baseUrl } from '../../urls/urls';
// import useAuth from './hooks/useAuth'; // Adjust the path as necessary
// const baseUrl = 'http://127.0.0.1:5000'

function Login() {
    const { login  } = useAuth(); // Use the custom hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (accessToken) {
    //       navigate('/home');  // Navigate to /home after successful login
    //     }
    //   }, [navigate]); // Depend on accessToken and navigate

    const handleSubmit = async (e) => {
      e.preventDefault();
      const loginUrl = baseUrl+'/login'
      try {
        const response = await axios.post(loginUrl, {
          username,
          password,
        });
        if (response.data.success === 1) {
          // Assuming your API returns user data and accessToken on success
          login({"data":response.data.data, "accessToken":response.data.accessToken}); // Adjust based on your API response structure
          setMessage('Login successful!');
        //   setIsAuthenticated(true)
          // Redirect or navigate to another page if needed
          navigate('/home')
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage('Login failed. Please try again.');
      }
    };
  
    return (
      <>
        <LandNavbar />
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <Row className="w-100">
            <Col md={6} lg={4} className="mx-auto">
              <h2 className="text-center mb-4">Login</h2>
              {message && <div className="alert alert-danger">{message}</div>} {/* Display error/success messages */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username : User@123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
  
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password : User@123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
  
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
  
                <div className="text-center mt-3">
                  <Link to="/signup" className="text-decoration-none">
                    Don’t have an account? Sign Up
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footor/>
      </>
    );
  }
  
  export default Login;