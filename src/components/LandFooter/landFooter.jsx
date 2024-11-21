import { Container, Row, Col } from 'react-bootstrap';

const Footor = () => {
    return (
        <footer className="text-center py-4" style={{ backgroundColor: '#0a0a15', color: '#c8d0d3' }}>
            <Container>
                <Row>
                    <Col>
                        <p style={{ color: '#c8d0d3' }}>© 2024 Your E-commerce Website</p>
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

export default Footor;
