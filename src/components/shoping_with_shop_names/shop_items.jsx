import React , { useEffect, useState } from "react";
import { useAllCatgris2 } from "../../hooks/item_categories/itemcatgris2";
import Card from "../itemcard/card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/userAuth";
import { baseUrl } from "../../urls/urls";
// const baseUrl='http://127.0.0.1:5000'

const ShopItems = () => {
    const {accessToken}=useAuth();
    const { allCatgries } = useAllCatgris2();
    const [items, setItems] = useState([]);
    const [selectedType,setSelectedType] = useState(allCatgries[0]['category_name'])
    const {shop_id} = useParams();

    useEffect(()=>{
        fetchItemsByType(selectedType)
    },[])

    const fetchItemsByType = async (type) => {
        try {
            const response = await axios.post(`${baseUrl}/vendor_single_type/${type}`,{
                "shop_id":shop_id
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setItems(response.data.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        fetchItemsByType(type);
    };

    return (
        <div style={{}}>
            <div className="items-button-container" style={{position:"sticky",top:"1px"}}>
                {allCatgries.map((single_cat) => (
                    <button className="items-button"
                        key={single_cat['category_name']}
                        onClick={() => handleTypeClick(single_cat['category_name'])}
                        style={{
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: selectedType === single_cat['category_name'] ? 'blue' : 'gray',
                            color: 'white',
                        }}
                    >
                        {single_cat['category_name']}
                    </button>
                ))}
            </div>

            <div style={{  marginTop: '20px' }}>
                {/* <h3>Items</h3> */}
                {items.length > 0 ? (
                    <div className="card-list">
                        {items.map((item) => (
                            <React.Fragment key={item.id}>
                                <Card item={item} frroom={'category'} />
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div>No items available.</div>
                )}
            </div>
        </div>
    )
}


export default ShopItems;
