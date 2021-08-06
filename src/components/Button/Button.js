import React from 'react';

const Button = ({className, onClick, children}) => {
    return (
        <div data-testid="button" className={className} onClick={onClick}>
            {children}
        </div>        
    );
}

export default Button;