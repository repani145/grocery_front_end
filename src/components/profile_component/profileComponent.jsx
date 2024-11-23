import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi'; // Import pen icon
import axios from 'axios';
import { baseUrl } from '../../urls/urls';
import { useAuth } from '../../hooks/useAuth/userAuth';
import './profile.css'
import human from './human_icon.jpg'

const ProfilePage = () => {
    const { accessToken } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        address: "",
        dob: "",
        email: "",
        full_name: "",
        landmark: "",
        phone_number: "",
        role: "",
        username: "",
    });

    const [updatedData, setUpdatedData] = useState({ ...userData });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [emailEditMode, setEmailEditMode] = useState(false);

    // Get user data
    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user_data`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data.success) {
                    setUserData(response.data.data);
                    setUpdatedData(response.data.data); // Set updatedData to initial user data
                }
            } catch (err) {
                setMessage('User data not found. Try again!');
                setIsError(true);
            }
        };
        dataFetch();
    }, [accessToken]);

    // Toggle modal visibility
    const handleModalShow = () => {
        setShowModal(true);
        setOtpSent(false); // Reset OTP state when modal opens
    };

    const handleModalClose = () => {
        setShowModal(false);
        setOtpSent(false);
        setIsVerified(false);
        setOtp('');
        setMessage('');
        setEmailEditMode(false); // Reset email edit mode
        setUpdatedData(userData); // Reset updated data to initial state when modal is closed
    };

    // Handle form input changes in the modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Send OTP for email verification
    const sendOtp = async () => {
        try {
            const response = await axios.post(`${baseUrl}/send-otp`, { email: updatedData.email });
            if (response.data.success) {
                setOtpSent(true);
                setMessage("OTP sent to your email. Please verify to proceed.");
                setIsError(false);
            } else {
                setMessage(response.data.message);
                setIsError(true);
            }
        } catch (error) {
            setMessage("Failed to send OTP. Please try again.");
            setIsError(true);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${baseUrl}/verify-otp`, {
                email: updatedData.email,
                otp,
            });
            if (response.data.success) {
                setIsVerified(true);
                setMessage("Email verified successfully. You can save changes now.");
                setIsError(false);
            } else {
                setMessage(response.data.message);
                setIsError(true);
            }
        } catch (error) {
            setMessage("Failed to verify OTP. Please try again.");
            setIsError(true);
        }
    };

    // Update user data
    const handleUpdate = async () => {
        // If email was edited, ensure it is verified
        if (emailEditMode && !isVerified) {
            setMessage("Please verify your email before saving changes.");
            setIsError(true);
            return;
        }

        try {
            const response = await axios.put(
                `${baseUrl}/user_data`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Profile updated successfully!");
                setUserData(updatedData); // Update the profile page with the changes
                handleModalClose();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card profile-card shadow-lg p-4 position-relative">
                    <button
                        className="btn btn-primary update-btn"
                        onClick={handleModalShow}
                    >
                        Update
                    </button>
                    <div className="row align-items-center">
                        <div className="col-md-3 text-center mb-4">
                            <img
                                src={human}
                                alt="Profile"
                                className="rounded-circle img-fluid profile-img"
                            />
                            <h3 className="mt-3 profile-name">{userData.full_name}</h3>
                            <p className="text-muted profile-role">{userData.role}</p>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-4">
                                    <h5 className="text-primary mb-3">Contact Information</h5>
                                    <div className="card info-card">
                                        <p><strong>Username:</strong> {userData.username}</p>
                                    </div>
                                    <div className="card info-card">
                                        <p><strong>Email:</strong> {userData.email}</p>
                                    </div>
                                    <div className="card info-card">
                                        <p><strong>Phone:</strong> {userData.phone_number}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="card info-card">
                                        <p><strong>Landmark:</strong> {userData.landmark}</p>
                                    </div>
                                    <div className="card info-card">
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
                        {message && (
                            <Alert variant={isError ? "danger" : "success"}>{message}</Alert>
                        )}
                        <form>
                            {/* Full Name */}
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="full_name"
                                    value={updatedData.full_name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="email"
                                        className="form-control me-2"
                                        name="email"
                                        value={updatedData.email}
                                        onChange={handleChange}
                                        disabled={!emailEditMode}
                                    />
                                    <FiEdit
                                        size={20}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setEmailEditMode(true);
                                            setOtpSent(false);
                                            setIsVerified(false);
                                        }}
                                    />
                                </div>
                                {emailEditMode && !otpSent && (
                                    <Button className="mt-3" variant="secondary" onClick={sendOtp}>
                                        Verify Email
                                    </Button>
                                )}
                            </div>
                            {otpSent && (
                                <>
                                    <div className="form-group mt-3">
                                        <label>OTP</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <Button className="mt-3" variant="primary" onClick={verifyOtp}>
                                        Submit OTP
                                    </Button>
                                </>
                            )}

                            {/* Address */}
                            <div className="form-group mt-3">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={updatedData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Landmark */}
                            <div className="form-group mt-3">
                                <label>Landmark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="landmark"
                                    value={updatedData.landmark}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* DOB */}
                            {/* <div className="form-group mt-3">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={updatedData.dob}
                                    onChange={handleChange}
                                />
                            </div> */}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div><br /><br />
        </>
    );
};

export default ProfilePage;
