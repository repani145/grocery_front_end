// Sidebar.js
import { Link } from 'react-router-dom';
import './side_bar.css';  // Create a separate CSS file for styling
import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaBoxes, FaDollarSign, FaShoppingCart } from 'react-icons/fa';



const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{width:collapsed ? '6%' : '18%'}}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                {/* <h2 className="sidebar-title">{!collapsed && 'Admin Panel'}</h2> */}
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/dashboard">
                            <FaTachometerAlt /> {!collapsed && 'Dashboard'}
                        </Link>
                    </li>
                    <li>
                        <Link to="/stock">
                            <FaBoxes /> {!collapsed && 'Stock'}
                        </Link>
                    </li>
                    <li>
                        <Link to="/income">
                            <FaDollarSign /> {!collapsed && 'Income'}
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <FaShoppingCart /> {!collapsed && 'Orders'}
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-categories">
                            <FaShoppingCart /> {!collapsed && 'all_cats'}
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='content' style={{
                position: 'fixed', 
                marginLeft: collapsed ? '6%' : '18%',
                padding: '20px',
                width: collapsed ? '94%' : '82%',
                transition: 'margin-left 0.3s ease', // Transition for smooth animation
                // transition: 'width 1s ease',
                // transformOrigin: 'left' 
            }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;

