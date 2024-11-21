import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ProfilePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        address: "Hyderabad",
        dob: "Mon, 01 Jan 2001 00:00:00 GMT",
        email: "user@gmail.com",
        full_name: "User",
        landmark: "KK",
        phone_number: "1010101010",
        role: "User",
        username: "User@123",
    });

    // Toggle modal visibility
    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    // Handle form input changes in the modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Update user data
    const handleUpdate = async () => {
        try {
            const response = await axios.put('/api/user/update', userData);
            console.log('Update successful:', response.data);
            alert("Profile updated successfully!");
            handleModalClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 position-relative">
                {/* Update Button */}
                <button 
                    className="btn btn-primary position-absolute" 
                    style={{ top: '10px', right: '10px' }}
                    onClick={handleModalShow}
                >
                    Update
                </button>

                <div className="row align-items-center">
                    {/* Profile Image Section */}
                    <div className="col-md-3 text-center mb-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="rounded-circle img-fluid"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h3 className="mt-3">{userData.full_name}</h3>
                        <p className="text-muted">{userData.role}</p>
                    </div>
                    
                    {/* Profile Details Section */}
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <h5 className="text-primary mb-3">Contact Information</h5>
                                <div className="card mb-2 p-2">
                                    <p><strong>Username:</strong> {userData.username}</p>
                                </div>
                                <div className="card mb-2 p-2">
                                    <p><strong>Email:</strong> {userData.email}</p>
                                </div>
                                <div className="card mb-2 p-2">
                                    <p><strong>Phone:</strong> {userData.phone_number}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <h5 className="text-primary mb-3">Address</h5>
                                <div className="card mb-2 p-2">
                                    <p><strong>Date of Birth:</strong> {new Date(userData.dob).toDateString()}</p>
                                </div>
                                <div className="card mb-2 p-2">
                                    <p><strong>Landmark:</strong> {userData.landmark}</p>
                                </div>
                                <div className="card mb-2 p-2">
                                    <p><strong>Address:</strong> {userData.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="full_name"
                                value={userData.full_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                value={userData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Landmark</label>
                            <input
                                type="text"
                                className="form-control"
                                name="landmark"
                                value={userData.landmark}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePage;
