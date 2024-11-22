import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './comp4.css'; // For custom styling if needed
import { useAllShopsData } from '../../hooks/all_shops/all_shops';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NearShops = ({fromm}) => {
  const { allShops } = useAllShopsData()

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 style={{ color: '#e5ac08' }}>Shops</h2>
        <h1>Near to You</h1>
      </div>
      <div className="row">
        {allShops.slice(0, 6).map((card) => (
          <div key={card.id} className="col-6 col-md-4 col-lg-2 mb-4"> {/* Responsive column classes */}
            <div className="card">
              <img src={card.image} alt={`Card ${card.id}`} style={{ height: "45vh" }} className="card-img-top" />
              <p className="card-text" style={{ position: "absolute", bottom: "25px",left:"5px", color: "white", textShadow: "0px 0px 2px black" }}><b>{card.shop_name}</b></p>
              {
                fromm?
                <>
                <Button style={{ backgroundColor: '#e5ac08', borderColor: '#e5ac08', color: '#1f1e1d' }}>
                <Link to={`/login`} style={{ textDecoration: "none", color: "black" }}>Shop Now</Link>
              </Button>
                </>
                :
                <>
                  <Button style={{ backgroundColor: '#e5ac08', borderColor: '#e5ac08', color: '#1f1e1d' }}>
                <Link to={`/home/shop/${card.id}`} style={{ textDecoration: "none", color: "black" }}>shop now</Link>
              </Button>
                </>
              }
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearShops;