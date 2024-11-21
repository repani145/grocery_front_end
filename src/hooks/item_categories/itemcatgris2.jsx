import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../useAuth/userAuth";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000';

const CategoriesContext = createContext();

export const AllCatgrisProvider2 = ({ children }) => {
    const { accessToken } = useAuth();
    const [allCatgries, setAllCatgris] = useState([]);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await axios.get(`${baseUrl}/categories`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                if (response.data.success === 1) {
                    setAllCatgris(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };

        fetchAllItems();
    }, [accessToken]);

    return (
        <CategoriesContext.Provider value={{ allCatgries }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useAllCatgris2 = () => useContext(CategoriesContext);
