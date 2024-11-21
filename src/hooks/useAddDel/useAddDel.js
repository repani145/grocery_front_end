import { useEffect } from "react"
import { useAuth } from "../useAuth/userAuth";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000';

// export const FunAdd = (item_id)=>{
//     const {accessToken} = useAuth();

//     useEffect(()=>{
//         const addCount = async () => {
//             try {
//                 const response = await axios.patch(`${baseUrl}/add_one_del`, {
//                     "item_id":`${item_id}`
//                 },{
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`
//                     }
//                 });
                
//             } catch (error) {
//                 console.error("Error adding one more item to cart :", error);
//             }
//         };
//         addCount()
//     },[])
// }

export const FunAdd = async (item_id,accessToken) => {
    try {
        const response = await axios.patch(`${baseUrl}/add_one_del`, {
            "item_id":`${item_id}`
        },{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
    } catch (error) {
        console.error("Error adding one more item to cart :", error);
    }
};


// export const FunDel = ({item_id})=>{
//     const {accessToken} = useAuth();

//     useEffect(()=>{
//         const delCount = async () => {
//             try {
//                 const response = await axios.patch(`${baseUrl}/add_one_del`, {
//                     "item_id":`${item_id}`
//                 },{
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`
//                     }
//                 });
                
//             } catch (error) {
//                 console.error("Error removing one item from cart :", error);
//             }
//         };
//         delCount()
//     },[])
// }

export const FunDel = async (item_id,accessToken) => {
    console.log(accessToken)
    try {
        const response = await axios.delete(`${baseUrl}/add_one_del`, {
            "id":`${item_id}`
        },{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
    } catch (error) {
        console.error("Error removing one item from cart :", error);
    }
};