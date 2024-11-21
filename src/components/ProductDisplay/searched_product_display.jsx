import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { searchItemsContext } from '../../contexts/searchProductsContext/searchPros';


const SearchedProductDisplay = () => {
    const item_id = useParams();
    const {singleItem,setSingleItem,similarItems,setSimilarItems} = useContext(searchItemsContext)

    return (
        <Container className="my-4">
            {/* Main Product */}
            <Row className="justify-content-center mb-5">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Img variant="top" src={singleItem.image} alt={singleItem.name} />
                        <Card.Body>
                            <Card.Title>{singleItem.name}</Card.Title>
                            <Card.Text>Price: ${singleItem.price}</Card.Text>
                            <Card.Text>Quantity: {singleItem.quantity}</Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Related Products */}
            <h4 className="text-center mb-4">Related Products</h4>
            <Row>
                {similarItems.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={product.image} alt={product.name} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="secondary" href={`/product/${product.id}`}>
                                    View Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchedProductDisplay;
