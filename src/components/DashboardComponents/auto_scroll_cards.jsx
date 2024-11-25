import React, { useState, useEffect } from 'react';
import './AutoScrollCard.css'; // Import your custom styles for scrolling

const AutoScrollCard = () => {
    const images = [
        'https://via.placeholder.com/300x200?text=Image+1',
        'https://via.placeholder.com/300x200?text=Image+2',
        'https://via.placeholder.com/300x200?text=Image+3',
        'https://via.placeholder.com/300x200?text=Image+4',
        'https://via.placeholder.com/300x200?text=Image+5'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000); // Change image every 0.5 second

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="card dd1" style={{ borderRadius: "10px", height: "350px" }}>
            <div className="card-body">
                <h5 className="card-title">Auto Scroll Images</h5>
                <div className="image-container">
                    <img 
                        src={images[currentIndex]} 
                        alt={`Image ${currentIndex + 1}`} 
                        className="image-card" 
                    />
                </div>
            </div>
        </div>
    );
};

export default AutoScrollCard;
