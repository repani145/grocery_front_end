import React from 'react';
import Modal from 'react-modal';

function Notification({ open, setOpen, message }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px', // Adjust width as needed
      height: '200px', // Adjust height as needed
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
  };

  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        ariaHideApp={false}
        style={customStyles} // Apply custom styles here
      >
        <h2>{message}</h2>
        <button onClick={() => setOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Notification;
