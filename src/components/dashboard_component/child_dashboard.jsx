import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberCard from "../DashboardComponents/cardone";
import BarGraphCard from "../DashboardComponents/bargraphCard";
import './child_comp.css'
import AutoScrollCard from "../DashboardComponents/auto_scroll_cards";
import RecentOrdersCard from "../DashboardComponents/recent_orders";
import CombinedCircularGraph from "../DashboardComponents/circulargraph";

const ChildDashboard = () => {
    return (
        <div className="container overflow-scroll" style={{ background: 'linear-gradient(to bottom right, #f0f0f0, #d9d9d9)' }}>
            {/* Row 2 */}
            <div className="row my-3">
                <div className="col-md-3 mb-1">
                    <div className="scale-card">
                        <NumberCard title={'Total Orders'} numbar={'1234'} numberColor="#FFD700" /> {/* Yellow for Total Orders */}
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Today Orders'} numbar={'24'} numberColor="#28a745" /> {/* Green for Today Orders */}
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Completed'} numbar={'34'} numberColor="#6c757d" /> {/* Gray for Completed */}
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Pending'} numbar={'234'} numberColor="#f39c12" /> {/* Orange for Pending */}
                    </div>
                </div>
            </div>

            {/* Row 1 */}
            <div className="row my-3">
                <div className="col-md-4 mb-2">
                    <AutoScrollCard />
                </div>
                <div className="col-md-8 mb-2">
                    <BarGraphCard />
                </div>
            </div>

            {/* Row 3 */}
            <div className="row">
                <div className="col-md-6 mb-2" >
                    <div className="card scale-card" style={{ height: "300px" }}>
                        <RecentOrdersCard />
                    </div>
                </div>
                <div className="col-md-6 mb-2" >
                    <div className="card scale-card" style={{ height: "300px" }}>
                        <CombinedCircularGraph
                            pending={150}    // Example data
                            progress={30}
                            completed={17}
                        />
                        {/* <NumberCard title={'Total Orders'} numbar={'1234'} numberColor="#FFD700" /> Yellow for Total Orders */}
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
};

export default ChildDashboard;
