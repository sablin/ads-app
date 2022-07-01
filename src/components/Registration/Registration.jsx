import React, { useState } from 'react';
import cl from './Registration.module.css'
import axios from 'axios';
import InputMask from 'react-input-mask';


const Registration = () => {


  const [user, setUser] = useState({
    email: "",
    phone: "+7",
    password: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    location: ""
  })

  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false)

  const handleForm = (e) =>{
      const target = e.target;
      const value= target.value;
      const name = target.name;

      setUser({
        ...user,
        [name]: value
      });
  }

  const register = (e) =>{
      e.preventDefault();

    const response = axios.post('http://ruizzi.ru/api/user/', user)
    .then(res => {
      setVisible(false)
      setSuccess(true);
    }).catch(res =>{
      setVisible(true);
      const err = Object.values(res.response.data);
      let errText = '';
      for (let i = 0; i< err.length; i++  ) {
         errText += err[i];
        }
        console.log(err)
        alert(errText);
    })

  } 


    return (

  <form className={cl.Registration} onSubmit={register}>
      <h3>Регистрация</h3>

      {
        success ?
        <p>Вы успешно зарегистрированы. Можете войти в сервис по указанным email и паролю.</p>
        :
        <div>
      <input type="text" name="first_name" onChange={handleForm} placeholder='Введите ваше имя' required/>
      <input type="text" name="middle_name" onChange={handleForm} placeholder='Введите вашу фамилию' required/>
      <input type="text" name="last_name" onChange={handleForm} placeholder='Введите ваше отчество' required/>
      <input type="text" name="phone" onChange={handleForm} placeholder='Введите номер телефона' pattern="^\+?\d{1,2}\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$" required/>
      <p>В формате +7 999 99-99-99</p>
      <input type="text" name="location" onChange={handleForm} placeholder='Введите ваш город' required/>
      <input type="text" name="email" onChange={handleForm} placeholder='Введите ваш email' required/>
      <input type="text" name="password" onChange={handleForm} placeholder='Придумайте пароль' required/>
      <input type="submit" value='Регистрация' />
        </div>
      }
      {
        visible ? <p>Проверьте введенные данные. В них присутствует ошибка</p> :  false
      }
     
  </form>
    );
};

export default Registration;