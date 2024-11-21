import React, { useState } from 'react';

const Logo = () => {
    // Adjust the size of the logo and its elements by decreasing by 30%
    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '105px', // 150px - 30%
        height: '105px', // 150px - 30%
        borderRadius: '50%',
        backgroundColor: '#f0e68c',
        position: 'relative',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
    };

    const eyeStyle = {
        width: '21px', // 30% smaller than 30px
        height: '21px', // 30% smaller than 30px
        backgroundColor: '#000',
        borderRadius: '50%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const pupilStyle = {
        width: '7px', // 30% smaller than 10px
        height: '7px', // 30% smaller than 10px
        backgroundColor: '#fff',
        borderRadius: '50%',
        position: 'absolute',
        transition: 'transform 0.1s ease',
    };

    const leftEyeStyle = {
        ...eyeStyle,
        left: '28px', // 40px - 30%
        top: '35px', // 50px - 30%
    };

    const rightEyeStyle = {
        ...eyeStyle,
        right: '28px', // 40px - 30%
        top: '35px', // 50px - 30%
    };

    const smileStyle = {
        width: '42px', // 60px - 30%
        height: '21px', // 30px - 30%
        borderBottom: '5px solid black',
        borderRadius: '0 0 50px 50px',
        position: 'absolute',
        bottom: '25px', // 35px - 30%
    };

    const [pupilPosition, setPupilPosition] = useState({ left: 0, right: 0 });

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const maxPupilMovement = 5;

        const leftPupilX = Math.min(maxPupilMovement, Math.max(-maxPupilMovement, x / 10));
        const leftPupilY = Math.min(maxPupilMovement, Math.max(-maxPupilMovement, y / 10));

        setPupilPosition({
            left: { transform: `translate(${leftPupilX}px, ${leftPupilY}px)` },
            right: { transform: `translate(${leftPupilX}px, ${leftPupilY}px)` },
        });
    };

    return (
        <>
            <div style={logoStyle} onMouseMove={handleMouseMove}>
                <div style={leftEyeStyle}>
                    <div style={{ ...pupilStyle, ...pupilPosition.left }}></div>
                </div>
                <div style={rightEyeStyle}>
                    <div style={{ ...pupilStyle, ...pupilPosition.right }}></div>
                </div>
                <div style={smileStyle}></div>
            </div>
            <p style={{ color: "white" }}><small>click on my eyes to scroll menu </small></p>
        </>
    );
};

// export default Logo;


const SmileLogo = ({ scrollLeft, scrollRight }) => {
    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '105px', // 150px - 30%
        height: '105px', // 150px - 30%
        borderRadius: '50%',
        backgroundColor: '#f0e68c',
        position: 'relative',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
    };

    const eyeStyle = {
        width: '21px', // 30% smaller than 30px
        height: '21px', // 30% smaller than 30px
        backgroundColor: '#000',
        borderRadius: '50%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const pupilStyle = {
        width: '7px', // 30% smaller than 10px
        height: '7px', // 30% smaller than 10px
        backgroundColor: '#fff',
        borderRadius: '50%',
        position: 'absolute',
        transition: 'transform 0.1s ease',
    };

    const leftEyeStyle = {
        ...eyeStyle,
        left: '28px', // 40px - 30%
        top: '35px', // 50px - 30%
    };

    const rightEyeStyle = {
        ...eyeStyle,
        right: '28px', // 40px - 30%
        top: '35px', // 50px - 30%
    };

    const smileStyle = {
        width: '42px', // 60px - 30%
        height: '21px', // 30px - 30%
        borderBottom: '5px solid black',
        borderRadius: '0 0 50px 50px',
        position: 'absolute',
        bottom: '25px', // 35px - 30%
    };

    const [pupilPosition, setPupilPosition] = useState({ left: 0, right: 0 });

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const maxPupilMovement = 5;

        const leftPupilX = Math.min(maxPupilMovement, Math.max(-maxPupilMovement, x / 10));
        const leftPupilY = Math.min(maxPupilMovement, Math.max(-maxPupilMovement, y / 10));

        setPupilPosition({
            left: { transform: `translate(${leftPupilX}px, ${leftPupilY}px)` },
            right: { transform: `translate(${leftPupilX}px, ${leftPupilY}px)` },
        });
    };

    return (
        <>
            <center>
                <div style={logoStyle} onMouseMove={handleMouseMove}>
                    <div style={leftEyeStyle} onClick={scrollLeft}>
                        <div style={{ ...pupilStyle, ...pupilPosition.left }} onClick={scrollLeft}></div>
                    </div>
                    <div style={rightEyeStyle} onClick={scrollRight}>
                        <div style={{ ...pupilStyle, ...pupilPosition.right }} onClick={scrollRight}></div>
                    </div>
                    <div style={smileStyle}></div>
                </div>
                <p style={{ color: "white", textShadow:"0px 0px 10px black",fontSize: "60%" ,marginBottom:"0px"}}>click on my eyes to scroll menu</p>
            </center>
        </>
    );
};

export default SmileLogo;
