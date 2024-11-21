import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css'; // CSS for styling (optional)
import UserNav from '../../components/user_nav/user_nav';
import UserFooter from '../../components/user_footer/user_footer';
import { useAuth } from '../../hooks/useAuth/userAuth';
import Loader1 from '../../services/loader1/loader1';
import { useUserData } from '../../contexts/multipleData/dataContext';
import { useCartData } from '../../hooks/my_cart/my_cart';
import { Link, useNavigate } from 'react-router-dom';
// import { FunAdd, FunDel } from '../../hooks/useAddDel/useAddDel';

const baseUrl = 'http://127.0.0.1:5000';

const Cart = () => {
    const { accessToken } = useAuth();
    const {cartItems, setCartItems ,status, setStatus,removed, setRemoved,itemsCount,totalCost, setTotalCost,setItemsCount} = useCartData()
    const navigate = useNavigate();
    const [total,setTotal] = useState(totalCost)
    

    useEffect(()=>{
        const total = cartItems.reduce((sum, item) => sum + item.item_data.price * item.count, 0);
        const total_count = cartItems.reduce((sum, item) => sum + item.count, 0);
        setItemsCount(total_count)
        setTotal(total)
    },[cartItems])

    const handleRemoveItem1 = async (item_id) => {
        try {
            const response = await axios.delete(`${baseUrl}/remove_cart_item/${item_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data.success == 1) {
                setRemoved(true)
                setStatus(null)
            }
            // const updatedItems = cartItems.filter(item => item.item_data['_id']!== item_id);
            // setCartItems(updatedItems);
            // calculateTotal(updatedItems);
            // navigate('/cart',{ replace: true })
            window.location.href = '/cart';
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleRemoveItem = (item_id) => {
        axios.delete(`${baseUrl}/remove_cart_item/${item_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.data.success === 1) {
            const updatedCartItems = cartItems.filter(cartItem =>
              cartItem.item_data['_id'] !== item_id)
    
            setCartItems(updatedCartItems);
            // setSingleItemCount(prevCount => Math.max(prevCount - 1, 0));
          }
        })
        .catch(error => {
          console.error("Error removing one item from cart:", error);
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
            // setSingleItemCount(prevCount => Math.max(prevCount - 1, 0));
          }
        })
        .catch(error => {
          console.error("Error removing one item from cart:", error);
        });
      };

    const DelOnee = async (item_id) => {
        try {
            const response = await axios.delete(`${baseUrl}/add_one_del/${item_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data.success == 1) {
                setRemoved(true)
                setStatus(null)
                // console.log("removedItem id :",item_id)
                // console.log(cartItems)
                const removedItem = cartItems.filter(item => item.item_data['_id'] == item_id)
                // window.location.href = '/cart';
                // setItemsCount(pre=>pre>0 ? pre-1 : 0)
            }

        } catch (error) {
            console.error("Error removing one item from cart :", error);
        }
    }

    const AddOne = async (item_id) => {
        // console.log("item_id to add =>>>",item_id)
        try {
            const response = await axios.patch(`${baseUrl}/add_one_del/${item_id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data.success == 1) {
                // window.location.href = '/cart';
                const AddedItem = cartItems.filter(item => item.item_data['_id'] == item_id)
                AddedItem[0]['count'] = (1 * AddedItem[0]['count']) + 1
                const PreItems = cartItems.filter(item => item.item_data['_id'] != item_id)
                setCartItems([...PreItems, ...AddedItem])
            }

        } catch (error) {
            console.error("Error adding one more item to cart :", error);
        }
    }
    return (
        <>
            <center><h2 style={{ marginTop: "3%", marginBottom: "-3%" }}>My Cart</h2></center>
            <div className="my-cart" style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>

                {cartItems.length > 0 ? (
                    <div style={{ width: '80%' }}>
                        <table className="cart-items">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item,index) => (
                                    <tr key={index} className="cart-item">
                                        <td><strong>{item.item_data.item_name}</strong></td>
                                        <td>₹{item.item_data.price}</td>
                                        <td>{
                                        }
                                            <button className='cart_buttons' onClick={() => { DelOne(item.item_data["_id"]) }}>-</button>
                                            <span className='cart_button'>{item.count}</span>
                                            <button className='cart_buttons' onClick={() => { AddOne(item.item_data["_id"]) }}>+</button>
                                        </td>
                                        <td>₹{(item.item_data.price * item.count).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemoveItem(item.item_data['_id'])} className="remove-button">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-summary">
                            <h3>Total Cost: ₹{total.toFixed(2)}</h3>
                            <button className="proceed-button"><Link to="/cart/payment" style={{textDecoration:"none",color:"white"}}>Proceed to Payment</Link></button>
                        </div>
                        
                    </div>
                ) : (
                    <center>
                        {
                            status ? <p>Your cart is empty.</p> : <Loader1 />
                        }
                    </center>
                )}
            </div>
        </>
    );
};

export default Cart;
