import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartData } from '../../hooks/my_cart/my_cart';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth/userAuth';
// import { StoreContext } from "../../component/contextstore/storedata";

const baseUrl = 'http://127.0.0.1:5000';

const CheckoutForm = () => {
  const { accessToken } = useAuth()
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const { totalCost, setCartItems ,setItemsCount} = useCartData();
  const stripe = useStripe();
  const elements = useElements();

  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [amount, setAmount] = useState(''); // Example of amount state if needed

  const save_payment = (payment_obj)=>{
    const pay = async()=>{
      const response = await axios.post(`${baseUrl}/payment`,{...payment_obj},{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
    }
    pay()
  }

  useEffect(() => {
    if (!totalCost) {
      setErrorMessage('No amount specified for payment.');
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded
    }

    setIsPaymentProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setErrorMessage('Card details are not provided.');
      setIsPaymentProcessing(false);
      return;
    }

    try {
      const response = await fetch('https://react-server-two.vercel.app/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: (totalCost + 50)}), // Example amount in cents
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      console.log("clientSecret = ", clientSecret)

      if (!clientSecret) {
        throw new Error('Client secret not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: 'Customer Name', // Replace with actual customer name if available
            address: { postal_code: '43546' } // Replace with actual postal code if available
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccessMessage('Payment successful!');
        const payment = { payment_intent_id: paymentIntent.id, amount: paymentIntent.amount, payment_method_id: paymentIntent.payment_method, status: paymentIntent.status }
        save_payment(payment)
        // console.log(payment)
        setCartItems([]);
        setItemsCount(0)
        navigate("/success");
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred');
    }

    setIsPaymentProcessing(false);
  };

  return (
    <div className="payment-form container mt-5 d-flex justify-content-center">
      <div className="col-md-6"> {/* This reduces the width */}
        <h2 className="text-center">Complete Payment</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              className="form-control"
              value={totalCost + 50}
              readOnly // Make amount read-only
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement id="cardNumber" className="form-control StripeElement" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cardExpiry">Expiration Date</label>
            <CardExpiryElement id="cardExpiry" className="form-control StripeElement" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cardCvc">CVC</label>
            <CardCvcElement id="cardCvc" className="form-control StripeElement" />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={!stripe || isPaymentProcessing}>
            {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );

};

export default CheckoutForm;
