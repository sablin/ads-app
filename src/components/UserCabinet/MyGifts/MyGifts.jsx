import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../context';
import Footer from '../../UI/footer/Footer';
import CollectGift from '../CollectGift/CollectGift';
import UserHeader from '../UserHeader/UserHeader';

import cl from './MyGifts.module.css';
import PrizeRequestApi from "../../../api/prize-request.api";

const MyGifts = () => {
    const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);
    const [prizes, setPrizes] = useState([]);
    const [myPrizes, setMyPrizes] = useState([]);

    useEffect(() => {
        PrizeRequestApi.getListUserRequests()
            .then((res) => {
                setPrizes(res.data)
            });
    }, []);


    return (
        <div>
            <UserHeader
                firstName={loginUser.first_name}
                middleName={loginUser.middle_name}
                lastName={loginUser.last_name}
                points={loginUser.points_amount}
            />
            <div className={cl.prizeContainer}>
                {prizes.length > 0 ?
                    (
                        prizes.map((el) => {
                            return (
                                <CollectGift
                                    id={el.prize}
                                />
                            );
                        })
                    )
                    :
                    (
                        <p>Призов пока нет</p>
                    )
                }

            </div>
            <Footer/>
        </div>
    );
};

export default MyGifts;
