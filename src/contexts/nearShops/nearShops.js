import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../useAuth/userAuth"
import axios from "axios";
import { baseUrl } from "../../urls/urls";

const CartDataContext = createContext()

// const baseUrl = 'http://127.0.0.1:5000';


export const MycartDataProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [status, setStatus] = useState(null);
    const [removed, setRemoved] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const { accessToken } = useAuth();

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get(`${baseUrl}/cart`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCartItems(response.data.data);
                setTotalCost(response.data.data);
                setStatus(response.data.success);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        dataFetch();
        setRemoved(false);

        // Optional: reset status after a delay (if required)
        const timeoutId = setTimeout(() => {
            setStatus(true);
        }, 7000);

        // Cleanup timeout on unmount
        return () => clearTimeout(timeoutId);

    }, [accessToken]); // `accessToken` dependency ensures it fetches only when token changes

    return (
        <CartDataContext.Provider value={{ itemsCount, setItemsCount, removed, setRemoved, cartItems, setCartItems, status, setStatus,totalCost }}>
            {children}
        </CartDataContext.Provider>
    );
};

export const useCartData = () => useContext(CartDataContext);
