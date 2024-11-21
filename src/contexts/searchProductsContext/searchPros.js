import { createContext, useContext, useState } from "react";

export const  searchItemsContext = createContext()

export const SearchProvider = ({children})=>{
    const [singleItem,setSingleItem] = useState()
    const [similarItems,setSimilarItems] = useState()
    return(
        <searchItemsContext.Provider value = {{singleItem,setSingleItem,similarItems,setSimilarItems}}>
            {children}
        </searchItemsContext.Provider>
    )
}
