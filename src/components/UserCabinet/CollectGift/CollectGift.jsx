import React, {useContext, useEffect, useState} from 'react';
import SERV from '../../../constants/server';
import {AuthContext} from '../../../context';
import NewButton from '../../UI/NewButton/NewButton';

import cl from './CollectGift.module.css'
import PrizeApi from "../../../api/prize.api";


const CollectGift = ({id}) => {

    const {token} = useContext(AuthContext);
    const [myPrize, setMyPrize] = useState([]);

    useEffect(() => {
        PrizeApi.informationAboutGiftsById(id)
            .then((res) => {
                console.log(res.data);
                setMyPrize(res.data);
            });
    }, []);


    return (
        <div className={cl.gift}>
            <div className={cl.imageBox}>
                <img src={myPrize.image} alt=""/>
                <div className={cl.giftInfo}>
                    <p>{myPrize.title}</p>
                    <p>{myPrize.description}</p>
                </div>

            </div>
        </div>
    )


};

export default CollectGift;