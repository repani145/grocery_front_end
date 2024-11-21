import React from 'react';

const QuoteBanner1 = () => {
  return (
    <div style={styles.container}>
      <h1><span style={styles.text1}>Your grocery list just got smarter</span> <br/><span style={styles.text2}>shop fresh, shop local</span></h1>
      <h1 > </h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    backgroundColor: '#fffae5', // Light yellow that complements the main color
    padding: '20px',
    textAlign: 'center',
  },
  text1: {
    color: '#e5ac08', // Main color provided
    fontSize: '2.5rem',
    fontWeight: 'bold',
    maxWidth: '80%',
    lineHeight: '1.4',
    textShadow: '2px 2px #8b5d0e', // Soft brown shadow for added contrast
  },text2: {
    color: '#e5ac08', // Main color provided
    fontSize: '5.5rem',
    fontWeight: 'bold',
    maxWidth: '80%',
    lineHeight: '1.4',
    textShadow: '2px 2px #8b5d0e', // Soft brown shadow for added contrast
  },
};

export default QuoteBanner1;
