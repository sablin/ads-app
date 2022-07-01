import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import cl from './AdminCabinet.module.css'
import AdminHeader from './AdminHeader/AdminHeader';
import ImageControls from './ImageControls/ImageControls';
import UserList from './UserList/UserList';
import Cashout from './Сashout/Cashout';

const AdminCabinet = () => {
    return (
        <div className={cl.adminCabinet}>
            <AdminHeader />
            <div>
            <div className="container">
                <Routes>
                    <Route path="users" element={<UserList/>} />
                    <Route path="cashout" element={<Cashout />}/>
                    <Route path="/" element={<ImageControls />}/>
                </Routes>
                
          
            </div>
            </div>
      
        </div>
    );
};

export default AdminCabinet;