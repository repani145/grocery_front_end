import ChildDashboard from "../../components/dashboard_component/child_dashboard";
import AdminLayout from "../../components/sidebar/side_bar";
import VendorNavbar from "../../components/vendor_nav/vendor_nav";



const Dashboard = ()=>{
    return(
        <>
        <VendorNavbar/>
        <AdminLayout>
            <ChildDashboard/>
        </AdminLayout>
        </>
    )
}

export default Dashboard;