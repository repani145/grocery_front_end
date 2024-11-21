import { BrowserRouter, Route ,Routes, useNavigate , Navigate} from "react-router-dom";
import LandingPage from "../pages/landing_page/landing_page";
import Login from "../pages/login_page/login_page";
import SignUp from "../pages/signup_page/signup";
import {useAuth} from "../hooks/useAuth/userAuth";
import Home from "../pages/user_home_page/home_page";
import VendorHome from "../pages/admin_home_page/home_page";
import Dashboard from "../pages/dashboard/dashboard";
import Stock from "../pages/stocks/stocks";
import Income from "../pages/vendor_income/income";
import Orders from "../pages/vendor_orders/orders";
import Category from "../pages/category/category";
import Cart from "../pages/cart/cart";
import CheckoutForm from "../pages/payment/CheckoutForm";
import PaymentSuccess from "../pages/payment/paymentSucess";
import MyOrders from "../pages/my_orders/my_orders";
import AddNavFooter from "../components/add-nav-footer/add_nav_foot";
import AllCats from "../pages/all_categories_add/all_categories";
import ShopItems from "../components/shoping_with_shop_names/shop_items";
import ProfilePage from "../components/profile_component/profileComponent";
import SearchedProductDisplay from "../components/ProductDisplay/searched_product_display";


const AllPages = ()=>{
    const {user, accessToken} = useAuth(); // Get user and token from custom useAuth hook

    // console.log(user['role'])
    return(
        <>
            <Routes>
                {accessToken ? 
                <>
                    {
                    user['role']=='user' ? 
                    <>
                        <Route path="/home" element={<AddNavFooter><Home/></AddNavFooter>}/>
                        <Route path="/home/category/:category" element={<AddNavFooter><Category/></AddNavFooter>}/>
                        <Route path="/cart" element={<AddNavFooter><Cart/></AddNavFooter>}/>
                        <Route path="cart/payment" element={<CheckoutForm/>}/>
                        <Route path="my-orders" element={<AddNavFooter><MyOrders/></AddNavFooter>}/>
                        <Route path="/success" element={<PaymentSuccess/>}/>
                        <Route path="/home/shop/:shop_id" element={<AddNavFooter><ShopItems/></AddNavFooter>} />
                        <Route path="/profile" element={<AddNavFooter><ProfilePage/></AddNavFooter>}/>
                        <Route path="/product/:item_id" element={<AddNavFooter><SearchedProductDisplay/></AddNavFooter>} />
                        {/* <Route path="/payment" element={<Payment/>}/> */}
                    </>
                    :
                    <>
                        <Route path="/home" element={<VendorHome/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/stock" element={<Stock/>}/>
                        <Route path="/income" element={<Income/>}/>
                        <Route path="/orders" element={<Orders/>} /> 
                        <Route path="/all-categories" element={<AllCats/>}/>
                    </>
                }
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </> 
                : 
                <>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
                }
                
            </Routes>
        </>
    )
}

export default AllPages;