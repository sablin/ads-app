import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import NewButton from '../../UI/NewButton/NewButton';
import userIcon from '../../../assets/icon.png'


import cl from './UserHeader.module.css';

const UserHeader = (props) => {

    const {setIsAuth} = useContext(AuthContext);

    const logout = () =>{

        localStorage.removeItem('auth');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('token');
        setIsAuth({'auth' : false, 'user': ''});
    }

    return (
        <div className={cl.topLine}>
        <div className="container">
            <div className={cl.topButtons}>
                <div>
                <Link to="/lk">Главная страница</Link>
            <Link to="/lk/gifts">Выбор призов</Link> 
            <Link to="/lk/mygifts">Мои призы</Link> 
                </div>

            <div className={cl.login}>
                <div className={cl.loginBlock}> 
                     <span>{props.firstName} {props.middleName} {props.lastName}</span>
                     <span>{props.points} баллов</span>
                </div>
                <div>
                <img src={userIcon} alt="" />
                </div>
               
                <Link to="/" onClick={logout}>Выход</Link>
            </div>
           
            </div>
        </div>
    </div>
    
    );
};

export default UserHeader;