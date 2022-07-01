import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../context';
import AdminCabinet from '../../AdminCabinet/AdminCabinet';
import MainPage from '../../MainPage/MainPage';
import UserCabinet from '../../UserCabinet/UserCabinet';


const Navigation = () => {

    const {isAuth, loginUser} = useContext(AuthContext);
  return (
    
    
      
        isAuth.auth
        ?
        (    loginUser.is_admin
          ?
          <Routes>
          <Route path="/admin/*" element={<AdminCabinet />} />
          <Route path='*' element={<Navigate replace to="/admin" />}/>
        </Routes>
          :
          <Routes>
          <Route path="/lk/*" element={<UserCabinet />} />
          <Route path='*' element={<Navigate replace to="/lk" />}/>
        </Routes>)
        :
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='*' element={<Navigate replace to="/" />}/>
        </Routes>
      

   
        
   
    );
};

export default Navigation;