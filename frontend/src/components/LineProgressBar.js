import React from 'react';

const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress" style={{ height: '24px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentage}%`,
            backgroundColor: lineColor,
            transition: 'width 1s ease-in-out',
          }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default LineProgressBar;
