import React, { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth/userAuth";
import axios from "axios";
import { baseUrl } from "../../urls/urls";
// const baseUrl='http://127.0.0.1:5000'

const MyOrders = () => {
    const {accessToken}=useAuth();
    const [orders,setOrders] = useState([])

    useEffect(()=>{
        const dataFetch = async()=>{
            try{
                const response =await axios.get(`${baseUrl}/my-orders`,{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(response.data)
                if (response.data.success == 1){
                    setOrders(response.data.data)
                }
            }catch(error){
                alert(error)
            }
        }
        dataFetch()
    },[])

  return (
    <Container fluid className="my-4 d-flex flex-column justify-content-center" style={{ minHeight: "100vh"}}>
      <h2 className="text-center mb-4" style={{ color: "#e5ac08",marginTop:"-150px" }}>My Orders</h2>

      {/* Header Card */}
      <Card className="mb-3" style={{ backgroundColor: "#c8d0d3", color: "#0d3a2d" }}>
        <Card.Body>
          <div className="row text-center">
            <div className="col-3"><strong>Order ID</strong></div>
            <div className="col-3"><strong>Date</strong></div>
            <div className="col-3"><strong>Delivery Status</strong></div>
            <div className="col-3"><strong>Total</strong></div>
          </div>
        </Card.Body>
      </Card>

      {/* Order Data Cards */}
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={index} className="mb-3" style={{ backgroundColor: "#0d3a2d", color: "#e5ac08" }}>
            <Card.Body>
              <div className="row text-center">
                <div className="col-3">{order.id}</div>
                <div className="col-3">{order.date}</div>
                <div className="col-3">{order.status}</div>
                <div className="col-3">₹{order.total.toFixed(2)}</div>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center" style={{ color: "#c8d0d3" }}>No orders found.</p>
      )}
    </Container>
  );
};

export default MyOrders;
