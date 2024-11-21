import AllCatgryList from "../../components/AllCategries/all_categries";
import AdminLayout from "../../components/sidebar/side_bar"
import VendorNavbar from "../../components/vendor_nav/vendor_nav"

const AllCats = ()=>{
    return(
        <>
            <VendorNavbar/>
            <AdminLayout>
                <AllCatgryList/>
            </AdminLayout>
        </>
    )
}
export default AllCats;