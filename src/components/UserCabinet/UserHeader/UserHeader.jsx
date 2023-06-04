import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import userIcon from '../../../assets/icon.png'


import cl from './UserHeader.module.css';
import TokenService from "../../../services/token.service";

const UserHeader = (props) => {

    const {setIsAuth} = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const logout = () =>{

        TokenService.clearLocalTokens()
        localStorage.removeItem('auth');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('token');
        setIsAuth({'auth' : false, 'user': ''});
    }

    return (
        <div className={cl.topLine}>
        <div className="container">
            <div className={cl.topButtons}>
                <div className={cl.topMenu}>
                <Link to="/lk">Главная страница</Link>
            <Link to="/lk/gifts">Выбор призов</Link> 
            <Link to="/lk/mygifts">Мои призы</Link> 
                </div>
                <button className={cl.menuButton} onClick={()=>setOpen(!open)}><i className="fa fa-bars" aria-hidden="true"></i>
</button>
                {
                    open ?
                        (
                            <div className={cl.mobileMenu}>
                                <button className={cl.mobileClose}  onClick={()=>setOpen(!open)}><i className="fa fa-times" aria-hidden="true"></i>
</button>

                        <div className={cl.loginBlockMenu}> 
                     <p>{props.firstName} {props.middleName} {props.lastName}</p>
                     <p>{props.points} баллов</p>
                </div>
                <hr />
                            <Link to="/lk">Главная страница</Link>
                        <Link to="/lk/gifts">Выбор призов</Link> 
                        <Link to="/lk/mygifts">Мои призы</Link> 
                         
                            </div>
                        )
                        :
                        (
                            null
                        )
                }
             

            <div className={cl.login}>
                <div className={cl.loginBlock}> 
                     <span>{props.firstName} {props.middleName} {props.lastName}</span>
                     <span>{props.points} баллов</span>
                </div>
                <div>
                <img src={userIcon} className={cl.userIcon} alt="" />
                </div>
               
                <Link to="/" onClick={logout}>Выход</Link>
            </div>
           
            </div>
        </div>
    </div>
    
    );
};

export default UserHeader;