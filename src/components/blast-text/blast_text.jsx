import React from 'react';
import './PrizeBlast.css';

const PrizeBlastModal = ({ showModal, handleCloseModal, blast_text }) => {
    //   const [showModal, setShowModal] = useState(false);
    //   const handleOpenModal = () => setShowModal(true);
    //   const handleCloseModal = () => setShowModal(false);

    return (
        <>
            {/* <button className="open-modal-button" onClick={handleOpenModal}>
        Click for Surprise!
      </button> */}

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="blast-container">
                        <h1 className="blast-text">{blast_text}</h1>
                        <div className="ribbons">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    className="ribbon"
                                    key={i}
                                    style={{
                                        '--i': i,
                                        '--hue': Math.random() * 360, // Dynamic color
                                        '--angle': Math.random() * 360, // Dynamic angle
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default PrizeBlastModal;
