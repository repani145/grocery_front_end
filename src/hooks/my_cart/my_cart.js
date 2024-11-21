import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../useAuth/userAuth"
import axios from "axios";
import Cart from "../../pages/cart/cart";
import Home from "../../pages/user_home_page/home_page";
import Category from "../../pages/category/category";

const CartDataContext = createContext()

const baseUrl = 'http://127.0.0.1:5000';

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "../useAuth/userAuth";
// import axios from "axios";

// const CartDataContext = createContext();

// const baseUrl = 'http://127.0.0.1:5000';

export const MycartDataProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState(null);
    const [removed, setRemoved] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const { accessToken } = useAuth();

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.item_data.price * item.count, 0);
        setTotalCost(total);
        const total_count = items.reduce((sum, item) => sum + item.count, 0);
        setItemsCount(total_count);
    };

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get(`${baseUrl}/cart`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.success === 1) {
                    setCartItems(response.data.data);
                    calculateTotal(response.data.data);
                    setStatus(response.data.success);
                }
                else {
                    // Optional: reset status after a delay (if required)
                    const timeoutId = setTimeout(() => {
                        setStatus(true);
                    }, 3000);

                    // Cleanup timeout on unmount
                    return () => clearTimeout(timeoutId);
                }

            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        dataFetch();
        setRemoved(false);
        // console.log("MycartDataProvider")
    }, [accessToken]); // `accessToken` dependency ensures it fetches only when token changes

    return (
        <CartDataContext.Provider value={{ itemsCount, setItemsCount, removed, setRemoved, cartItems, setCartItems, status, setStatus, totalCost }}>
            {children}
        </CartDataContext.Provider>
    );
};

export const useCartData = () => useContext(CartDataContext);
