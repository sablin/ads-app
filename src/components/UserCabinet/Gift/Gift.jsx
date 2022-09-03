import React from 'react';
import NewButton from '../../UI/NewButton/NewButton';

import cl from './Gift.module.css'

const Gift = ({but, name, discr, balance, img, getPrize, id}) => {
    return (
        <div className={cl.gift}>
            <div className={cl.imageBox}>
            <img src={img} alt={name} />
            </div>
           
            <h2>{name}</h2>
            <p>{discr}</p>
            <span>{balance} баллов</span>
            <NewButton className="giftButton" onClick={() => getPrize(id)}>{but}</NewButton>
        </div>
    );
};

export default Gift;