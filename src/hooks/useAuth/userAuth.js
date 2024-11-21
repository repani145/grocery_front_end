// import { useState, useEffect } from 'react';

// const useAuth = () => {
//     const [user, setUser] = useState(null);
//     const [accessToken, setAccessToken] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false); 

//     // Load user data and token from localStorage if they exist
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         const storedToken = localStorage.getItem('accessToken');
//         const authenticate = localStorage.getItem('isAuthenticated');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         if (storedToken) {
//             setAccessToken(storedToken);
//         }
//         if (authenticate) {
//             setIsAuthenticated(authenticate);
//         }
//     }, []);

//     const login = (response) => {
//         // console.log(response)
//         const { accessToken, data } = response; // Extract accessToken and user data from response
//         // console.log("accessToken = ",accessToken)
//         // console.log('data = ',data)
//         setUser(data); // Set user data from the response
//         setAccessToken(accessToken); // Set the access token from the response
//         localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
//         localStorage.setItem('accessToken', accessToken); // Store access token in local storage
//         localStorage.setItem("isAuthenticated",true)
//     };

//     const logout = () => {
//         setUser(null); // Clear user data
//         setAccessToken(null); // Clear access token
//         localStorage.removeItem('user'); // Remove user data from local storage
//         localStorage.removeItem('accessToken'); // Remove access token from local storage
//         localStorage.removeItem("isAuthenticated");
//     };

//     return { user, accessToken,isAuthenticated, setIsAuthenticated , login, logout };
// };

// export default useAuth;

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    
    const login = (response) => {
        // console.log(response)
        const { accessToken, data } = response; // Extract accessToken and user data from response
        // console.log("accessToken = ",accessToken)
        // console.log('data = ',data)
        setUser(data); // Set user data from the response
        setAccessToken(accessToken); // Set the access token from the response
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
        localStorage.setItem('accessToken', accessToken); // Store access token in local storage
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

