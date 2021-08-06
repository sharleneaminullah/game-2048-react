import React from 'react';
import './score.scss';

const Score = ({children}) => {
    return (
        <div className="score-container">
          <div className="score-header">SCORE</div>
          <div data-testid="score-value">{children}</div>
        </div>
    );
}

export default Score;