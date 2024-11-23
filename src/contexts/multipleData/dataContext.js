import { createContext, useContext, useState } from "react";

const UserDataContext = createContext()

export const UserDataProvider = ({children})=>{
    const [itemsCount,setItemsCount] = useState(0)

    return(
        <UserDataContext.Provider value={{ itemsCount ,setItemsCount }}>
            {children}
        </UserDataContext.Provider>
    );
}

export const useUserData = ()=> useContext(UserDataContext)