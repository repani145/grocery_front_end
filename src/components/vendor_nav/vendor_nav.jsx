import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth/userAuth';
import { useNavigate } from 'react-router-dom';

const VendorNavbar = ({ onToggleSidebar }) => {
    const {logout} = useAuth()
    const navigate = useNavigate()
    const Logout = ()=>{
        logout()
        navigate('/')
    }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      {/* Left Icon - Toggle Sidebar */}
      <Navbar.Brand href="#" onClick={onToggleSidebar}>
        <FaBars size={24} />
      </Navbar.Brand>

      {/* Right Side - User Dropdown */}
      <Nav className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle variant="secondary" id="dropdown-user">
            <FaUserCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#logout" onClick={Logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default VendorNavbar;
