import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../useAuth/userAuth";
import { baseUrl } from "../../urls/urls";
// const baseUrl = 'http://127.0.0.1:5000';

const AllShopsContext = createContext();

export const AllShopsProvider = ({ children }) => {
    const { accessToken } = useAuth();
    const [allShops, setAllSops] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${baseUrl}/all_shops`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                if (response.data.success === 1) {
                    setAllSops(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };

        fetchdata();
    }, [accessToken]);

    return (
        <AllShopsContext.Provider value={{ allShops }}>
            {children}
        </AllShopsContext.Provider>
    );
};

export const useAllShopsData = () => useContext(AllShopsContext);
