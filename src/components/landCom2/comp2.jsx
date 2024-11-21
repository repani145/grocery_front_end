import React, { useEffect, useRef } from 'react';
import './comp2.css';
import comp from './comp2.png'

const LandComp2 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Component is in view");
          entry.target.classList.add('animate');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,  // Trigger when at least 10% is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="image-text-container2 image-on-left2">
      <div className="image-content2 slide-left">
        <img
          src={comp}
          alt="Store"
        />
      </div>
      <div className="text-content2 slide-right">
        <h2>Our local shops</h2>
        <p>
          Local shops prioritize customer satisfaction, often going above and beyond to maintain high 
          quality because they value their direct relationship with the community. Unlike corporate or 
          online grocery stores, where products can sometimes lack consistency and customer feedback is
           more distant, local shops know that maintaining quality is essential to retaining loyal customers.
         This focus on quality, driven by accountability and trust, ensures customers receive fresh, reliable 
         products. Shopping locally not only brings better transparency and value but also supports local 
         employment and keeps the marketplace diverse, free from corporate tactics that push unnecessary bulk 
         buying through flashy offers.
        </p>
      </div>
    </div>
  );
};

export default LandComp2;
