import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from './logo.png'

const UserFooter = () => {
  return (
    <footer className="text-center py-4" style={{ backgroundColor: '#0d3a2d', color: '#c8d0d3' }}>
      <Container>
        <Row>
          {/* Logo Column */}
          <Col md={2} className="text-md-start mb-3 mb-md-0">
            <img src={logo} alt="Logo" style={{ maxWidth: '300px',position:"absolute",left:"-30px" }} />
          </Col>

          {/* Column 1 */}
          <Col md={2} className="text-md-start mb-3 mb-md-0">
            <h6>Organic</h6>
            <p>About us</p>
            <p>Conditions</p>
            <p>Our Journals</p>
            <p>Careers</p>

          </Col>

          {/* Column 2 */}
          <Col md={2} className="text-md-start mb-3 mb-md-0">
            <h6>Quick Links</h6>
            <p>Stores</p>
            <p>Track Order</p>
            <p>Shop</p>
            <p>Info</p>
          </Col>

          {/* Column 3 */}
          <Col md={2} className="text-md-start mb-3 mb-md-0">
            <h6>Customer Service</h6>
            <p>FAQ</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Delivery Information</p>
          </Col>

          {/* Column 4 - Subscribe */}
          <Col md={4} className="text-md-start">
            <h6>Subscribe Us</h6>
            <p>Subscribe to our newsletter to get updates about our grand offers.</p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
                style={{ backgroundColor: '#c8d0d3', borderColor: '#e5ac08' }}
              />
              <Button variant="warning" style={{ color: '#0d3a2d' }}>Subscribe</Button>
            </Form>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <p>© 2024 Your E-commerce Website</p>
            <p>
              <a href="#" className="text-decoration-none" style={{ color: '#e5ac08' }}>Privacy Policy</a> |
              <a href="#" className="text-decoration-none" style={{ color: '#e5ac08', marginLeft: '10px' }}>Terms of Service</a> |
              <a href="#" className="text-decoration-none" style={{ color: '#e5ac08', marginLeft: '10px' }}>Contact Us</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default UserFooter;
