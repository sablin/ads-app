import React, {useContext, useEffect, useState} from 'react';
import SERV from '../../../constants/server';
import {AuthContext} from '../../../context';
import Footer from '../../UI/footer/Footer';
import Gift from '../Gift/Gift';
import UserHeader from '../UserHeader/UserHeader';

import cl from './Gifts.module.css';
import PrizeApi from "../../../api/prize.api";
import TokenService from "../../../services/token.service";
import axios from "axios";
import PrizeRequestApi from "../../../api/prize-request.api";

const Gifts = () => {
    const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);
    const [prizes, setPrizes] = useState([]);
    const [myPrizes, setMyPrizes] = useState([]);

    useEffect(() => {
        PrizeApi.fetch()
            .then((res) => {
                setPrizes(res.data);
            })
            .catch((err) => {alert(err.response); alert(err); alert(err.message)});
    }, []);

    const getPrize = (id) => {
        const data = {
            prize: id,
        };
        PrizeRequestApi.creatingRequestForGift(data)
            .then((res) => {
                alert('Ваша заявка успешно создана. Ожидайте когда с вами свяжется администратор сервиса.');
            })
            .catch((err) => alert(err.response.data));
    };

    return (
        <div>
            <UserHeader
                firstName={loginUser.first_name}
                middleName={loginUser.middle_name}
                lastName={loginUser.last_name}
                points={loginUser.points_amount}
            />
            <div className={cl.prizeContainer}>
                {
                    prizes.length > 0 ?
                    (
                        prizes.map((el, id) => {
                            return (
                                <Gift
                                    but="Получить"
                                    getPrize={getPrize}
                                    id={el.id}
                                    name={el.title}
                                    key={id}
                                    discr={el.description}
                                    balance={el.cost}
                                    img={el.image}
                                />
                            );
                        })
                    )
                    :
                    <p>Идет загрузка призов...</p>

                }
            </div>
            <Footer/>
        </div>
    );
};

export default Gifts;
