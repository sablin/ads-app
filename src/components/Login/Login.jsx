import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context';
import cl from './Login.module.css';
import userApi from "../../api/user.api";

const Login = () => {
    const {setIsAuth, setLoginUser, setToken} = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const login = async (e) => {
        e.preventDefault();
        try {
            const token = await userApi.signIn(user)
            setToken(token.access);

            const responseUser = await userApi.userInfo()
            setLoginUser(responseUser)
            setIsAuth({auth: true, user: user});
            localStorage.setItem('auth', 'auth');
        } catch (error) {
            const err = Object.values(error.response.data);
            let errText = '';
            for (let i = 0; i < err.length; i++) {
                errText += err[i];
            }
            if (errText === 'This field may not be blank.This field may not be blank.') {
                alert('Заполните форму регистрации');
            }
            if (errText === 'No active account found with the given credentials') {
                alert('Пользователь с указанными данными не найден');
            }
        }

    };

    const handleForm = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value,
        });
    };

    return (
        <form className={cl.login} onSubmit={login}>
            <h3>Вход</h3>
            <input type="text" name="email" onChange={handleForm} placeholder="Email"/>
            <input type="text" name="password" onChange={handleForm} placeholder="Пароль"/>
            <input type="submit" value="Войти"/>
        </form>
    );
};

export default Login;
