import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './recent_orders.css'

const RecentOrdersCard = () => {
    const recentOrders = [
        { id: 101, customer: "John Doe", status: "Delivered" },
        { id: 102, customer: "Jane Smith", status: "Processing" },
        { id: 103, customer: "Alice Brown", status: "Shipped" },
        { id: 104, customer: "Bob White", status: "Cancelled" },
        { id: 105, customer: "Charlie Green", status: "Delivered" },
    ];

    return (
        <div className="card shadow-sm" style={{ borderRadius: '10px' ,overflowY:"auto"}}>
            <div className="card-body">
                <h5 className="card-title">Recent Orders</h5>
                <div className="list-group">
                    {recentOrders.map((order) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={order.id}>
                            <div>
                                <strong>Order #{order.id}</strong>
                                <p className="mb-0 text-muted">Customer: {order.customer}</p>
                            </div>
                            <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Shipped' ? 'bg-primary' : order.status === 'Processing' ? 'bg-warning' : 'bg-danger'}`}>
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentOrdersCard;
