import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './landNav.css'
import { Link } from 'react-router-dom';
import Login from '../../pages/login_page/login_page';
import logo from './logo4.png'

function LandNavbar() {
  return (
    <Navbar expand="lg" className='navback' >
      <Container fluid>
        {/* Logo on the left corner */}
        <Navbar.Brand  className="ms-2" style={{ color: "#724e27", fontWeight: "bold" }}>
          <Link to={'/'}><img src={logo} style={{width:"60px",height:"60px"}}/></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Centered navigation links */}
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#yourshop" style={{ color: "#8aa7d6" }}>
              Your Shop
            </Nav.Link>
            <Nav.Link href="#offers" style={{ color: "#8aa7d6" }}>
              Offers
            </Nav.Link>
            <Nav.Link href="#contactus" style={{ color: "#8aa7d6" }}>
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Right-aligned Login and Sign Up buttons */}
          <div className="d-flex">
            <Button
              variant="outline-primary"
              className="me-2"
              style={{
                color: "#ff6b57",
                borderColor: "#f6a859",
                backgroundColor: "transparent",
              }}
            >
              <Link to="/login" style={{ textDecoration: "none", color: "#ff6b57" }}>
                Login
              </Link>
            </Button>
            <Button
              variant="primary"
              style={{
                backgroundColor: "#f6a859",
                borderColor: "#f6a859",
                color: "white",
              }}
            >
              <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
                Sign Up
              </Link>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default LandNavbar;
