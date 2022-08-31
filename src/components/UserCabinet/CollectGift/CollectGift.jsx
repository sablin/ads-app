import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SERV from '../../../constants/server';
import { AuthContext } from '../../../context';
import NewButton from '../../UI/NewButton/NewButton';

import cl from './CollectGift.module.css'




const CollectGift = ({id}) => {

    const { token } = useContext(AuthContext);
    const [myPrize, setMyPrize] = useState([]);

    useEffect(() => {
        const response = axios
          .get(`${SERV}/prize/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setMyPrize(res.data);
          });
      }, []);


    return (
     <div className={cl.gift}>
            <div class={cl.imageBox}>
    <img src={myPrize.image} alt="" />
    <div className={cl.giftInfo}>
    <p>{myPrize.title}</p>
    <p>{myPrize.description}</p>
    </div>
 
    </div>
    </div>
    )
      
      
    
};

export default CollectGift;