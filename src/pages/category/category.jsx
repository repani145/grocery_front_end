import { useParams } from "react-router-dom"
import UserNav from "../../components/user_nav/user_nav";
import UserFooter from "../../components/user_footer/user_footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth/userAuth";
import Card from "../../components/itemcard/card";
import './category.css'
import Notification from "../../components/notification_component/notification";
import { useCartData } from "../../hooks/my_cart/my_cart";


const baseUrl = "http://127.0.0.1:5000"
// { item ,RemoveItem ,editData}

const Category = () => {
    const {setItemsCount} = useCartData()
    const { accessToken } = useAuth();
    const { category } = useParams()
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const dataFecth = async () => {
            try {
                const response = await axios.get(`${baseUrl}/single_type/${category}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(response)
                if (response.data.success == 1) {
                    setItems(response.data.data)
                    console.log(response.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        }
        dataFecth()
    }, [category])
    
    // const addToCart = (item_id) => {
    //     const add2cart = async()=>{
    //         try{
    //         const response = await axios.post(`${baseUrl}/add_to_cart`,{
    //             "item_id":`${item_id}`
    //         },{
    //             headers:{
    //                 Authorization:`Bearer ${accessToken}`
    //             }
    //         })
    //         if (response.data.success==1){
    //             setMessage(response.data.message)
    //             setOpen(true)
    //             setItemsCount(pre=>pre+1)
    //             console.log(response.data.message,open)
    //         }
    //         }catch(error){
    //             console.error("Failed to fetch items:", error);
    //         }
    //     }
    //     add2cart()
    // }


    return (
        <>
            <div style={{minHeight:"80vh"}}>
                <br/>
                <h3 className="text-center mb-4" style={{ color: '#e5ac08' }}>{category} Items</h3>
                {items.length > 0 ? (
                    <div className="card-list">
                        {items.map((item) => (
                            <React.Fragment key={item.id}>
                                <Card item={item}  frroom={'category'} />
                            </React.Fragment>
                        ))}
                        {
                            // open && <Notification open={open} setOpen={setOpen} message={message}/>
                        }
                    </div>
                ) : (
                    <p className="text-center">No items found for this type.</p>
                )}
            </div>
        </>
    )
}

export default Category;