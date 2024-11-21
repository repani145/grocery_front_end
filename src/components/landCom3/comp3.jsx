import React, { useState, useEffect, useRef } from 'react';
import './comp3.css';
import comp3 from './comp3.png'


const FadeZoomImage = ({ maxZoomLevel = 600 }) => {
  const containerRef = useRef(null);
  const [textScale, setTextScale] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const componentTop = rect.top; // Position of the component from the top of the viewport
    //   console.log("componentTop=",(window.innerHeight*0.8))
        // console.log('(',componentTop ,'<', window.innerHeight ,') && (', componentTop ,'>', 0 ,') = ',componentTop < window.innerHeight && componentTop > 0)
      // Calculate scale based on how far down the component is scrolled
      if (componentTop < window.innerHeight * 0.5 && componentTop > 0) {
        // Calculate scroll effect with an easing factor for smoother scaling
        const scrollEffect = (window.innerHeight * 0.5 - componentTop) / (window.innerHeight * 0.5);
    
        // Apply easing using Math.pow() for a smoother effect
        const easedEffect = Math.pow(scrollEffect, 0.5); // Adjust the exponent for desired smoothness (0.5 is a square root for easing)
    
        // Set the text scale with smoother scaling using easedEffect
        setTextScale(Math.min(20 + easedEffect * (maxZoomLevel - 20), maxZoomLevel));
    }
    
    }
  };
  console.log('scale=>',textScale)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="zoom-text-container">
      <div
        className="text"
        style={{
          transform: `scale(${textScale}%)`,
        }}
      >
        <p className='live-text'>Gully Grocery</p>
        {/* <img className='live-img' src={comp3}/> */}
      </div>
    </div>
  );
};




export default FadeZoomImage;
