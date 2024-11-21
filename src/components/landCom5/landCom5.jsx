import React from 'react';
import './comp5.css'

const BootstrapComponent5 = () => {
  const items = [
    { id: 1, logo: 'https://via.placeholder.com/50', title: 'Item 1', description: 'Description for item 1' },
    { id: 2, logo: 'https://via.placeholder.com/50', title: 'Item 2', description: 'Description for item 2' },
    { id: 3, logo: 'https://via.placeholder.com/50', title: 'Item 3', description: 'Description for item 3' },
  ];

  return (
    <div className="container text-center my-5">
      <h2 className="subtitle">Subtitle</h2>
      <h1 className="title mb-4">Main Title</h1>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="ccc0">
              <img src={item.logo} alt={`Logo ${item.id}`} className="card-img-top" />
              <div className="ccc">
                <h5 className="ccc-title">{item.title}</h5>
                <p className="ccc-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootstrapComponent5;
