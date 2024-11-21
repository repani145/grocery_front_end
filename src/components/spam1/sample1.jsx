import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth/userAuth";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000/'

const CatgryImages = () => {
    const { accessToken } = useAuth()
    const [catgryList, setCatgryList] = useState([])

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get(`${baseUrl}/categories`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (response.data.success == 1) {
                    setCatgryList(response.data.data)
                }
            } catch (error) {
                alert(error)
            }

        }
        dataFetch()
    }, [])

    return (
        <>
            {catgryList.length ?
                    catgryList.map((single_cat, index) => (
                        <div key={index}>
                            <img src={single_cat['image']} alt="category image" style={{width:"20%",height:"40vh"}} />
                            <p>{single_cat['category_name']}</p>
                        </div>
                    ))
                :
                <><h1>empty items list </h1></>
            }
        </>
    )
}
export default CatgryImages;