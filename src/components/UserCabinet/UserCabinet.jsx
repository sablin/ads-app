import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import cl from './UserCabinet.module.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import UserHeader from './UserHeader/UserHeader';
import UserMain from './UserMain/UserMain';
import Gifts from './Gifts/Gifts';
import MyGifts from './MyGifts/MyGifts';

const UserCabinet = () => {


    return (
        <div className={cl.userCabinet}>
           
                <Routes>
                <Route path="/mygifts" element={<MyGifts />}/>
                    <Route path="/gifts" element={<Gifts />}/>
                    <Route path="/" element={<UserMain />} />
                </Routes>
         
        </div>
    );
};

export default UserCabinet;