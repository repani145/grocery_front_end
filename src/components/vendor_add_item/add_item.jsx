import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AddItem = () => {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [formData, setFormData] = useState({
        item_name: '',
        price: '',
        stock: '',
        quantity: '',
        category: ''
    });

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/add_item`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data.success) {
                alert('Item added successfully!');
                setShowAddItemModal(false); // Close modal on success
            }
        } catch (error) {
            console.error('Error adding item', error);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowAddItemModal(true)}>
                Add Item
            </Button>

            {/* Add Item Modal */}
            <Modal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="item_name"
                                value={formData.item_name}
                                onChange={handleInputChange}
                                placeholder="Enter item name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter price"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                placeholder="Enter stock"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                placeholder="Enter quantity"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select category</option>
                                {itemTypes.map((type, index) => (
                                    <option key={index} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Item
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddItem;
