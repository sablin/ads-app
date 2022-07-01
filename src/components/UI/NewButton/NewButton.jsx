import React from 'react';
import cl from './NewButton.module.css'
const NewButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.button}>
            {children}
        </button>
    );
};

export default NewButton;