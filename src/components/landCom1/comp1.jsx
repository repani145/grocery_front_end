import React from 'react';
import './comp1.css';
import comp1 from './comp1.jpg'

const LandCom1 = () => {
  return (
    <div className="image-text-container">
      <div className="text-content">
        <h2>Old Grocery shops</h2>
        <p>
        Old local grocery shops in India, known as *kirana* stores, are small, family-run shops that have been an essential part of Indian neighborhoods for generations. These shops offer a range of daily essentials, from rice, spices, and lentils to toiletries, at a very personal level, often knowing their customers by name and providing customized services, including home delivery and credit. Kirana stores hold a special place in the community, acting as social hubs and fostering long-term relationships. Despite competition from supermarkets and online platforms, these shops have remained resilient due to their convenience, customer loyalty, and adaptability to local needs.
        </p>
      </div>
      <div className="image-content">
        <img
          src={comp1}
          alt="Sample"
        />
      </div>
    </div>
  );
};

export default LandCom1;
