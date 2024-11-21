import AdminLayout from "../../components/sidebar/side_bar";
import VendorNavbar from "../../components/vendor_nav/vendor_nav";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth/userAuth";
import { Modal, Button, Form } from 'react-bootstrap';
import Card from "../../components/itemcard/card";
import './stocks.css'
import { useAllCatgris2 } from "../../hooks/item_categories/itemcatgris2";
import { baseUrl } from "../../urls/urls";
// const baseUrl = "http://127.0.0.1:5000";

const Stock = () => {
    const { allCatgries } = useAllCatgris2();
    const [items, setItems] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const { accessToken } = useAuth();
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [onUpdate, setOnUpdate] = useState(false);
    const [formData, setFormData] = useState({
        item_name: '',
        price: '',
        stock: '',
        quantity: '',
        category: '',
        image: null, // Add image to the formData state
    });

    const fetchItemsByType = async (type) => {
        try {
            const response = await axios.get(`${baseUrl}/vendor_single_type/${type}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setItems(response.data.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        fetchItemsByType(type);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            // Handle file input separately
            setFormData((prevData) => ({
                ...prevData,
                image: files[0], // Save the file object
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const addItem = async () => {
            try {
                const form = new FormData();
                // Append the form fields to the FormData object
                for (const key in formData) {
                    form.append(key, formData[key]);
                }

                const response = await axios.post(`${baseUrl}/add_item`, form, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
                    }
                });

                if (response.data.success) {
                    setItems((prevData) => [...prevData, response.data.data]);
                    setShowAddItemModal(false); // Close modal on success
                }
            } catch (error) {
                console.error('Error adding item', error);
            }
        };

        const updateItem = async () => {
            try {
                const form = new FormData();
                // Append the form fields to the FormData object
                for (const key in formData) {
                    form.append(key, formData[key]);
                }

                const response = await axios.patch(`${baseUrl}/single_item/${onUpdate}`, form, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
                    }
                });

                if (response.data.success) {
                    setItems((prevItems) =>
                        prevItems.map((item) =>
                            item['_id'] === response.data.data['_id'] ? response.data.data : item
                        )
                    );
                    setOnUpdate(false); // Reset the update state
                    setShowAddItemModal(false); // Close the modal
                }
            } catch (error) {
                console.error('Error updating item', error);
            }
        };

        onUpdate ? updateItem() : addItem();
    };

    const RemoveItem = (item_id) => {
        const deleteItem = async () => {
            try {
                const response = await axios.delete(`${baseUrl}/single_item/${item_id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setItems((prevItems) => prevItems.filter(item => item['_id'] !== item_id));
            } catch (error) {
                console.error('Error removing item', error);
            }
        };
        deleteItem();
    };

    const editData = (obj) => {
        setOnUpdate(obj['_id']);
        const { _id, shop_id, ...new_obj } = obj;
        setFormData(new_obj);
        setShowAddItemModal(true);
    };

    return (
        <>
            <VendorNavbar />
            <AdminLayout>


                <div className="scrollable-container">
                    <div>
                    <Button variant="primary" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => setShowAddItemModal(true)}>
                                Add Item
                            </Button>

                        <Modal show={showAddItemModal} onHide={() => {
                            setOnUpdate(false);
                            setShowAddItemModal(false);
                        }}>
                            <Modal.Header closeButton>
                                <Modal.Title>{onUpdate ? "Update the item" : "Add New Item"}</Modal.Title>
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
                                            {allCatgries.map((one_cat, index) => (
                                                <option key={index} value={one_cat['category_name']}>
                                                    {one_cat['category_name']}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Image Field */}
                                    <Form.Group controlId="image">
                                        <Form.Label>Item Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        {onUpdate ? "Update the Data" : "Add Item"}
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <h2>Stock Management</h2>
                    <div className="items-button-container">
                        {allCatgries.map((single_cat) => (
                            <button className="items-button"
                                key={single_cat['category_name']}
                                onClick={() => handleTypeClick(single_cat['category_name'])}
                                style={{
                                    margin: '5px',
                                    padding: '5px',
                                    backgroundColor: selectedType === single_cat['category_name'] ? 'blue' : 'gray',
                                    color: 'white',
                                }}
                            >
                                {single_cat['category_name']}
                            </button>
                        ))}
                    </div>

                    <div style={{ overflowY: "scroll", height: "60vh", marginTop: '20px' }}>
                        <h3>Items</h3>
                        {items.length > 0 ? (
                            <div className="card-list">
                                {items.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <Card item={item} RemoveItem={RemoveItem} editData={editData} frroom={'stock'} />
                                    </React.Fragment>
                                    // <li key={item.id}>{item.item_name}</li>
                                ))}
                            </div>
                        ) : (
                            <div>No items available.</div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Stock;
