import axios from 'axios';
import React, { useContext, useState } from 'react';
import SERV from '../../constants/server';
import { AuthContext } from '../../context';
import cl from './Login.module.css';
const Login = () => {
  const { isAuth, setIsAuth, loginUser, setLoginUser, token, setToken } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const login = (e) => {
    e.preventDefault();

    const response = axios
      .post(`${SERV}/token/`, user)
      .then((res) => {
        setToken(res.data.access);
        localStorage.setItem('token', res.data.access);
        axios
          .get(`${SERV}/user/me`, {
            headers: {
              Authorization: `Bearer ${res.data.access}`,
              'Accept-Language': 'ru-RU, ru'
            },
          })
          .then((res) => {
            console.log(res);
            setLoginUser(res.data);
            localStorage.setItem('loginUser', loginUser);
            localStorage.setItem('auth', 'auth');
          });
        setIsAuth({ auth: true, user: user });
        // localStorage.setItem('user', user);
        // localStorage.setItem('auth', 'auth');
      })
      .catch((res) => {
        const err = Object.values(res.response.data);
        let errText = '';
        for (let i = 0; i < err.length; i++) {
          errText += err[i];
        }
        if(errText === 'This field may not be blank.This field may not be blank.'){
          alert('Заполните форму регистрации');
        }
        if(errText === 'No active account found with the given credentials'){
          alert('Пользователь с указанными данными не найден');
        }
      });
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
      <input type="text" name="email" onChange={handleForm} placeholder="Email" />
      <input type="text" name="password" onChange={handleForm} placeholder="Пароль" />
      <input type="submit" value="Войти" />
    </form>
  );
};

export default Login;
