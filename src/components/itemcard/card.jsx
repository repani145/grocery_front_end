import axios from 'axios';
import './card.css';
import { useAuth } from '../../hooks/useAuth/userAuth';
import { useCartData } from '../../hooks/my_cart/my_cart';
import { useEffect, useState } from 'react';

const baseUrl = "http://127.0.0.1:5000";

const Card = ({ item, RemoveItem, editData, frroom }) => {
  const { cartItems, setCartItems , setItemsCount } = useCartData();
  const { accessToken } = useAuth();
  const [singleItemCount, setSingleItemCount] = useState(0);

  useEffect(() => {
    // Find the item in the cart and set the count if it exists
    const existingItem = cartItems.find(cartItem => cartItem.item_data['_id'] === item['_id']);
    setSingleItemCount(existingItem ? existingItem.count : 0);
    const total_count = cartItems.reduce((sum, item) => sum + item.count, 0);
    setItemsCount(total_count)
  }, [cartItems, item]);

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
    <div className="card-container">
      <div className="card-image">
        <img
          src={item.image}
          alt={item.item_name}
        />
      </div>
      <div className="card-details">
        <div className="card-title">
          <p>{item.item_name}</p>
        </div>
        <div className="card-info">
          <p><b>Price:</b> {item.price} Rs.</p>
          <p><b>Quantity:</b> {item.quantity}</p>
          <p><b>Stock Available:</b> {item.stock}</p>
        </div>
        <div className="card-actions">
          {frroom === 'category' && (
            <div className="item-counter">
              {singleItemCount > 0 ? (
                <>
                  <button className='cart_buttons' onClick={() => DelOne(item['_id'])}>-</button>
                  <span className='cart_button'>{singleItemCount}</span>
                  <button className='cart_buttons' onClick={() => AddOne(item["_id"])}>+</button>
                </>
              ) : (
                <button className='cart_button' onClick={() => AddOne(item["_id"])}>Add to Cart</button>
              )}
            </div>
          )}
          {frroom === 'stock' && (
            <>
              <button className="btn-edit" onClick={() => editData(item)}>Edit</button>
              <button className="btn-remove" onClick={() => RemoveItem(item['_id'])}>Remove</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
