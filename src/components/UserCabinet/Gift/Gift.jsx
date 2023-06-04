import React, {useState} from 'react';
import NewButton from '../../UI/NewButton/NewButton';

import cl from './Gift.module.css'

const Gift = ({but, name, discr, balance, img, getPrize, id}) => {



    const [showInfo, setShowInfo] = useState(false);



    const showMore = () =>{
        setShowInfo(!showInfo);
        console.log(showInfo)
    }

    return (
        <div className={cl.gift}>
            <div className={cl.imageBox}>
            <img src={img} alt={name} />
            <div className={cl.prizeInfo}>
            <h2>{name}</h2>
            <span>{balance} баллов</span>
            <button className={cl.moreButton} onClick={showMore}><i className="fa fa-info-circle" aria-hidden="true"></i> Подробнее</button>
                                            {showInfo 
                                            ?<p>{discr}</p>
 :
 null
                                            
                                            }

            
        
            </div>
            </div>
        
            
            <NewButton className="giftButton" onClick={() => getPrize(id)}>{but}</NewButton>
        </div>
    );
};

export default Gift;