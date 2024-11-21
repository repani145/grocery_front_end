
import React from "react";
import { useNavigate } from "react-router-dom";
import "./paymentSuccess.css"
const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="payment-container">
      <div className="payment-success">
        <h1>Your Payment is successful!</h1>
        <button className="back-button" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
