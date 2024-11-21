import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../useAuth/userAuth";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000';

const CategoriesContext = createContext();

export const AllCatgrisProvider = ({ children }) => {
    const { accessToken } = useAuth();
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_item_types`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                if (response.data.success === 1) {
                    setAllItems(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };

        fetchAllItems();
    }, [accessToken]);

    return (
        <CategoriesContext.Provider value={{ allItems }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useAllItems = () => useContext(CategoriesContext);
