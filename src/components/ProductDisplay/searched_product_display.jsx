import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { searchItemsContext } from '../../contexts/searchProductsContext/searchPros';
import axios from 'axios';
import { baseUrl } from '../../urls/urls';
import { useAuth } from '../../hooks/useAuth/userAuth';
import { useCartData } from '../../hooks/my_cart/my_cart';
import Loader1 from '../../services/loader1/loader1';

const SearchedProductDisplay = () => {
    const {pro_id} = useParams();
    const {accessToken} = useAuth();
    const { cartItems, setCartItems , setItemsCount } = useCartData();
    const [singleItemCount, setSingleItemCount] = useState(0);
    // const item_id = singleItem['id']

    const { singleItem, setSingleItem, similarItems, setSimilarItems } = useContext(searchItemsContext)
    // console.log("singleItem====",categry)
    useEffect(()=>{
        const dataFetch = async ()=>{
            try {
                const response = await axios.get(`${baseUrl}/search?query=${localStorage.getItem('categry')}`,{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                // setSingleItem(response.data)
                setSimilarItems(response.data.filter(item=>item['id']!=localStorage.getItem('pro_id')));  // Update suggestions with API response
                setSingleItem(response.data.filter(item=>item['id']===localStorage.getItem('pro_id'))[0])
            } catch (error) {
                console.error("Error fetching search suggestions:", error);
            }
        }
        dataFetch()
    },[])

    useEffect(() => {
        // Find the item in the cart and set the count if it exists
        const existingItem = cartItems.find(cartItem => cartItem.item_data['_id'] === singleItem['id']);
        setSingleItemCount(existingItem ? existingItem.count : 0);
        const total_count = cartItems.reduce((sum, item) => sum + item.count, 0);
        setItemsCount(total_count)
      }, [singleItem]);

    const AddOne = (item_id) => {
        axios.patch(`${baseUrl}/add_one_del/${item_id}`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.data.success === 1) {
            // Find the item in cartItems and update it or add it if it doesn't exist
            const existingItem = cartItems.find(cartItem => cartItem.item_data['_id'] === item_id);
      
            if (existingItem) {
              // If the item exists, increment the count
              const updatedCartItems = cartItems.map(cartItem => 
                cartItem.item_data['_id'] === item_id 
                  ? { ...cartItem, count: cartItem.count + 1 } 
                  : cartItem
              );
              setCartItems(updatedCartItems);
              setSingleItemCount(existingItem.count + 1); // Update the UI count
            } else {
              // If the item doesn't exist, add it to cartItems
              const newItem = { item_data: { _id: item_id }, count: 1 };
              setCartItems([...cartItems, newItem]);
              setSingleItemCount(1); // Set the count to 1 for the new item
            }
          }
        })
        .catch(error => {
          console.error("Error adding one more item to cart:", error);
        });
      };
      
      const DelOne = (item_id) => {
        axios.delete(`${baseUrl}/add_one_del/${item_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.data.success === 1) {
            const updatedCartItems = cartItems.map(cartItem =>
              cartItem.item_data['_id'] === item_id 
                ? { ...cartItem, count: Math.max(cartItem.count - 1, 0) } 
                : cartItem
            ).filter(cartItem => cartItem.count > 0);
    
            setCartItems(updatedCartItems);
            setSingleItemCount(prevCount => Math.max(prevCount - 1, 0));
          }
        })
        .catch(error => {
          console.error("Error removing one item from cart:", error);
        });
      };

    return (
        <>
        {
            singleItem? 
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
                            {/* <Button variant="primary">Add to Cart</Button> */}
                            <div className="item-counter">
                                {singleItemCount > 0 ? (
                                    <>
                                        <button className='cart_buttons' onClick={() => DelOne(singleItem['id'])}>-</button>
                                        <span className='cart_button'>{singleItemCount}</span>
                                        <button className='cart_buttons' onClick={() => AddOne(singleItem['id'])}>+</button>
                                    </>
                                ) : (
                                    <button className='cart_button' onClick={() => AddOne(singleItem['id'])}>Add to Cart</button>
                                )}
                            </div>
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
                                <Button variant="secondary" onClick={()=>{
                                    localStorage.setItem('pro_id',product['id'])
                                }} href={`/product/${localStorage.getItem('categry')}`}>
                                    View Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        :
        // <h1>empty</h1>
        <Loader1/>
        }
        </>
    );
};

export default SearchedProductDisplay;
