import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';

import cl from './AdminHeader.module.css';
import TokenService from "../../../services/token.service";

const AdminHeader = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () =>{

        TokenService.clearLocalTokens()
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('loginUser');
        setIsAuth({'auth' : false, 'user': ''});
    }

    return (
        <div className={cl.topLine}>
        <div className="container">
            <div className={cl.topButtons}>
            <Link to="/admin/users">Список пользователей</Link>
            <Link to="/admin">Добавление слайдов</Link>
            <Link to="/admin/cashout">Заявки на призы</Link>
            <Link to="/" onClick={logout}>Выход</Link>
            </div>
        </div>
    </div>
    );
};

export default AdminHeader;