import AdminLayout from "../../components/sidebar/side_bar";
import VendorNavbar from "../../components/vendor_nav/vendor_nav";



const Dashboard = ()=>{
    return(
        <>
        <VendorNavbar/>
        <AdminLayout>
            <h1>Shiva Dashboard</h1>
        </AdminLayout>
        </>
    )
}

export default Dashboard;