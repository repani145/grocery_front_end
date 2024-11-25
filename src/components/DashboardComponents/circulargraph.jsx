import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CombinedCircularGraph = ({ pending, progress, completed, onRefresh }) => {
  const total = pending + progress + completed;

  // Calculate percentages for each segment
  const pendingPercentage = (pending / total) * 100;
  const progressPercentage = (progress / total) * 100;
  const completedPercentage = (completed / total) * 100;

  return (
    <div 
      className=" text-center  position-relative" 
      style={{  padding: '20px', width: '250px', margin: '0 auto' }}
    >
      {/* Refresh Button */}
      <button
        className="btn btn-light btn-sm position-absolute"
        style={{
          top: '10px',
          right: '10px',
          zIndex: '1',
          boxShadow: 'none',
          background: '#6c757d',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        }}
        onClick={onRefresh}
      >
        🔄
      </button>

      <h5 style={{ marginBottom: '20px', color: '#244888' }}>Order Status</h5>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <CircularProgressbarWithChildren
          value={100} // Always 100% for the outermost circle
          styles={buildStyles({
            pathColor: '#2980b9', // Completed (Blue)
            trailColor: '#f0f0f0',
          })}
        >
          <CircularProgressbarWithChildren
            value={completedPercentage + progressPercentage} // Completed + Progress for the middle circle
            styles={buildStyles({
              pathColor: '#27ae60', // Progress (Green)
              trailColor: 'transparent',
            })}
          >
            <CircularProgressbarWithChildren
              value={completedPercentage} // Only Completed for the innermost circle
              styles={buildStyles({
                pathColor: '#f39c12', // Pending (Yellow)
                trailColor: 'transparent',
              })}
            >
              <div style={{ textAlign: 'center', color: '#244888' }}>
                <h6>Total Orders</h6>
                <p>{total}</p>
              </div>
            </CircularProgressbarWithChildren>
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default CombinedCircularGraph;
