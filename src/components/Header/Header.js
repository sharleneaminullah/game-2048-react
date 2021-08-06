import React from 'react';
import './header.scss';


function Header() {
    return (
        <div>
            <div className="game-title">Game 2048!</div>
            <div className="game-details-container ">
                <div className="game-rule-container">
                    RULE: Click the arrow keys to move and add up to reach 2048!
                </div>
            </div>            
        </div>
    );
}

export default Header;