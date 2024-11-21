import AdminLayout from "../../components/sidebar/side_bar";
import VendorNavbar from "../../components/vendor_nav/vendor_nav";


const VendorHome = ()=>{

    return(
        <>
            {/* <h1>AdminHome</h1> */}
            <VendorNavbar/>
            <AdminLayout className="position-fixed">
                <h1>Dashboard</h1>
                <p>Welcome to the admin dashboard!</p>
            </AdminLayout>
        </>
    )
}

export default VendorHome;

//////////////////////////////////
