import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import cartIcon from './cart_icon.png';
import { useAuth } from '../../hooks/useAuth/userAuth';
import { useUserData } from '../../contexts/multipleData/dataContext';
import { useEffect, useState } from 'react';
import './user_nav.css'
import logo from './logo.png'
import { useCartData } from '../../hooks/my_cart/my_cart';
import { Link } from 'react-router-dom';
import NavSearch from '../searchComponent/search_comp';
import human from './human_icon.jpg'

const UserNav = () => {
    const { logout } = useAuth()
    const { itemsCount } = useCartData()
    const [blast, setBlast] = useState(false);
    // console.log("itemsCount = ",itemsCount)
    useEffect(() => {
        setBlast(true); // Trigger the blast effect
        const timer = setTimeout(() => setBlast(false), 500); // Remove the class after animation
        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, [itemsCount]);
    return (
        <>
            {/* Navbar */}
            <Navbar style={{ backgroundColor: '#0d3a2d' }} expand="lg" className="p-3">
                <Navbar.Brand href="/home" className="ms-3" style={{ color: '#e5ac08' }}>
                    <img src={logo} alt="Logo" style={{ height: '50px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavSearch/>
                    {/* <Nav className="mx-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search products..."
                                className="me-2"
                                aria-label="Search"
                                style={{ backgroundColor: '#c8d0d3', borderColor: '#75756f', color: '#1f1e1d' }}
                            />
                            <Button style={{ backgroundColor: '#e5ac08', borderColor: '#e5ac08', color: '#1f1e1d' }}>
                                Search
                            </Button>
                        </Form>
                    </Nav> */}
                    
                    {/* Cart and User Profile */}
                    <Nav className="me-3 d-flex align-items-center">
                        <div className="me-3 d-flex align-items-center">
                            <Nav.Link href="/cart" >
                                <img src={cartIcon} alt="Cart" style={{ height: '35px', marginRight: '0px' }} />
                            </Nav.Link>
                            <p className={`order_count ${blast ? "blast-effect" : ""}`} style={{ color: "white", position: "sticky", marginLeft: "-15px" }}><b>{itemsCount}</b></p>
                        </div>
                        <Dropdown align="end">
                            <Dropdown.Toggle as="a" className="nav-link p-0">
                                <img src={human} alt="User" style={{ height: '30px', borderRadius: '50%' }} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ backgroundColor: '#1f1e1d', color: '#c8d0d3' }}>
                                <Dropdown.Item style={{ color: '#c8d0d3' }}><Link to='/profile' style={{textDecoration:"none",color:"orange"}}>Profile</Link></Dropdown.Item>
                                <Dropdown.Item  style={{ color: '#c8d0d3' }}><Link to='/my-orders' style={{textDecoration:"none",color:"orange"}}>MyOrders</Link></Dropdown.Item>
                                <Dropdown.Item href="#logout" style={{ color: 'orange' }} onClick={logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default UserNav;
