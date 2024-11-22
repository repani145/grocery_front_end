import React from "react";
import "./comp5.css"; // Include the custom CSS

const BootstrapComponent5 = () => {
  const items = [
    { id: 1, logo: "👌", title: "Quality", description: "We ensure every product meets the highest standards of freshness and reliability." },
    { id: 2, logo: "💵", title: "Affordability", description: "Enjoy top-quality products without straining your budget." },
    { id: 3, logo: "💬", title: "Customer Support", description: "Always here to assist you with a smile." },
  ];

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container text-center">
        <h6 className="text-uppercase text-danger">A - KIND GROCERY ORDER</h6>
        <h2 className="fw-bold mb-5">Order with us is easy</h2>
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.id} className="col-sm-12 col-md-6 col-lg-4">
              <div className="h-100 shadow-sm p-3 bg-white rounded">
                <div className="card-body text-center">
                  <div className="circle-logo mx-auto mb-4">
                    <span className="logo-icon">{item.logo}</span>
                  </div>
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootstrapComponent5;
