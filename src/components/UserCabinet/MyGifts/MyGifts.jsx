import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context';
import Footer from '../../UI/footer/Footer';
import Gift from '../Gift/Gift';
import UserHeader from '../UserHeader/UserHeader';

import cl from './MyGifts.module.css'
const MyGifts = () => {

    const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);
    const [prizes, setPrizes] = useState([]);
    const [myPrizes, setMyPrizes] = useState([]);

    useEffect(()=>{
        const response = axios.get('http://ruizzi.ru/api/prize/',{headers: {
    Authorization: `Bearer ${token}`
    }}).then((res)=>{
        console.log(res.data);
        setPrizes(res.data)
    })
       }, [])

      const getPrize = (id) =>{
          const data = {
            "prize": id
          }
          console.log(data)
        const response = axios.post('http://ruizzi.ru/api/prize/request/', data, {headers: {
            Authorization: `Bearer ${token}`
            }}).then((res)=>{
                alert('Ваша заявка успешно создана. Ожидайте когда с вами свяжется администратор сервиса.')
            }).catch(err => alert(err.response.data))
      }


    return (
        <div>
<UserHeader firstName={loginUser.first_name} middleName={loginUser.middle_name} lastName={loginUser.last_name} points={loginUser.points_amount}/>
<div className={cl.prizeContainer}>
         {prizes.map(el => {
            return <Gift but='Получить' getPrize={getPrize} id={el.id} name={el.title} key={el.name} discr={el.description} balance={el.cost} img={el.image}/>
         })}
        </div>
        <Footer/>
        </div>
        
    );
};

export default MyGifts;