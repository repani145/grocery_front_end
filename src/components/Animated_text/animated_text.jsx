// AnimatedText.js
import React, { useState, useEffect } from 'react';
import 'animate.css';
// import './AnimatedText.css'; // Custom styles for fine-tuning

const AnimatedText = ({ text, animation = 'fadeInUp', duration = 1000, delay = 500 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const words = text.split(' ');

  useEffect(() => {
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
        wordIndex++;
      } else {
        wordIndex = 0;
        setDisplayedText('');
      }
    }, delay);

    return () => clearInterval(interval);
  }, [words, delay]);

  return (
    <div className={`animated-text animate__animated animate__${animation}`} style={{ animationDuration: `${duration}ms` }}>
      <h2>{"Gully Grocery"}</h2>
    </div>
  );
};

export default AnimatedText;
