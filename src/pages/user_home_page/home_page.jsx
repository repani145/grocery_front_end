import React, { useRef } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './home_page.css';
import { useAllItems } from '../../hooks/item_categories/item_catgris';
import SmileLogo from '../../components/spam1/smile_logo';
import { Link } from 'react-router-dom';
import NearShops from '../../components/landCom4/landCom4';
import WalkingHuman from '../../components/animated_human/animated_human';
import { useAllCatgris2 } from '../../hooks/item_categories/itemcatgris2';
import QuoteBanner1 from '../../components/quote_banners/banner1';
import appp from './app.png'
import SearchedProductDisplay from '../../components/ProductDisplay/searched_product_display';

const Home = () => {
    const scrollRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const { allItems } = useAllItems();
    const { allCatgries } = useAllCatgris2()

    const scrollLeft1 = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight1 = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Background Image and Scrolling Menu */}
            <div style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1661151892028-a712ab1782ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VwZXJtYXJrZXQlMjBkYXJrfGVufDB8fDB8fHww')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '50px 0',
                backgroundColor: '#1f1e1d'
            }}>
                <Container className="text-center" style={{ color: '#c8d0d3' }}>
                    <h1 style={{ color: '#e5ac08' }}>Welcome to Gully Grocery</h1>
                    <p>Discover our exclusive collection</p>

                    {/* Scroll Buttons */}
                    <SmileLogo scrollLeft={scrollLeft} scrollRight={scrollRight} />
                    {/* <button onClick={scrollLeft} style={{ marginRight: '10px',borderRadius:"50%" }}>←</button>
                    <button onClick={scrollRight} style={{borderRadius:"50%"}}>→</button> */}

                    {/* Horizontal Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        style={{
                            display: 'flex',
                            overflowX: 'scroll',
                            whiteSpace: 'nowrap',
                            padding: '20px 0',
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none' // Firefox
                        }}
                        className="scrollable-container"
                    >
                        {allCatgries.map((menuItem, index) => (
                            <div key={index} className="me-3 p-3" style={{
                                minWidth: '150px',
                                display: 'inline-block',
                                cursor: 'pointer',
                                backgroundColor: '#c8d0d3',
                                color: '#1f1e1d',
                                borderRadius: '5px',
                                boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                                <Link to={`/home/category/${menuItem.category_name}`} style={{ textDecoration: "none", color: "black" }}>{menuItem.category_name}</Link>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            
            
            <WalkingHuman />
            {/* Categories Section */}
            <Container className="my-5">
                <h2 className="text-center mb-4" style={{ color: '#e5ac08' }}>Shop by Categories</h2>
                <div className="scroll-container">
                    <Button onClick={scrollLeft1} className="scroll-button left-scroll">
                        {'<'}
                    </Button>
                    <div className="categories-scroll" ref={scrollRef}>
                        <Row style={{ flexWrap: 'nowrap' }}>
                            {allCatgries.map((category, index) => (
                                <Col key={index} md={4} className="mb-4" style={{ flex: '0 0 auto', width: '250px' }}>
                                    <Card style={{ height: '100%', borderColor: '#e5ac08' }}>
                                        <Card.Img variant="top" src={category.image} alt={`${category.category_name}`} style={{height:"25vh"}} />
                                        <Card.Body style={{ backgroundColor: '#1f1e1d', color: '#c8d0d3' }}>
                                            <Card.Title style={{ color: '#e5ac08' }}>{category.category_name}</Card.Title>
                                            <Card.Text>
                                                Browse our collection of {category.category_name.toLowerCase()}.
                                            </Card.Text>
                                            <Button style={{ backgroundColor: '#e5ac08', borderColor: '#e5ac08', color: '#1f1e1d' }}>
                                            <Link to={`/home/category/${category.category_name}`} style={{ textDecoration: "none", color: "black" }}>shop now</Link>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <Button onClick={scrollRight1} className="scroll-button right-scroll">
                        {'>'}
                    </Button>
                </div>
            </Container>
            <QuoteBanner1/>              
            <NearShops />
            <img src={appp} alt='app' width={"100%"} />
        </div>
        
    );
};

export default Home;
