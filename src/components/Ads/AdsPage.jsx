
import React from 'react';


import cl from './Ads.module.css';

const AdsPage = () => {
 
  return (
   <div style={{'width': '400px', maxWidth: '100%'}}>
        <h3>Рекламодателям</h3>
        <h5>Сервис уникальных предложений Izzi дарит невероятные скидки и подарки пользователям! Мы приглашаем Вас стать партнером Izzi.</h5>
        <p>Вы получаете:</p>
        <ul>
            <li> Постоянный поток клиентской базы</li>
            <li> Мотивация к дополнительным и сопутствующим покупкам</li>
            <li> Лояльность клиента и его статистика</li>
            <li> Адресный подход к покупателю на основе его активности</li>
            <li> Онлайн-доступ к пожеланиям клиентов и персональное предложение в ответ на них</li>
        </ul>
        <h3>Как стать нашим партнером:</h3>
        <p>1. Придумать товар,услугу, акцию, которую хотите продвигать!
Важно, чтобы она была уникальной и не использовалась в других
рекламных компаниях в городе.</p>
<p>2. Оставить заявку на электронную почту либо в телеграмм.
Мы обязательно с вами свяжемся</p>
   </div>

  
  );
};

export default AdsPage;
