import React, { useEffect, useRef } from 'react';
import './WalkingHuman.css';
import WalkingHumanGif from './logo4.png'; // Replace with the actual path to your gif

const WalkingHuman = () => {
  const humanRef = useRef(null);

  useEffect(() => {
    const animateHuman = () => {
      if (!humanRef.current) return;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Generate random positions within viewport bounds
      const randomX = Math.random() * (viewportWidth - 80); // Subtract to keep the image fully in view
      const randomY = Math.random() * (viewportHeight - 80);

      // Apply new position with a random transition duration
      humanRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
      humanRef.current.style.transition = `transform ${Math.random() * 3 + 2}s ease-in-out`;
    };

    // Animate every few seconds
    const interval = setInterval(animateHuman, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="walking-human" ref={humanRef}>
      <img src={WalkingHumanGif} alt="Walking Human" />
    </div>
  );
};

export default WalkingHuman;
