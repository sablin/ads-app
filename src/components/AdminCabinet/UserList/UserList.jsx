import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import NewButton from '../../UI/NewButton/NewButton';
import { AuthContext } from '../../../context';
const UserList = () => {

    const [users, setUsers] = useState([]);
    const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);



    useEffect(()=>{
        const response = axios.get('http://ruizzi.ru/api/user/',{headers: {
            Authorization: `Bearer ${token}`
            }}).then(res=>setUsers(res.data))
       }, [])

    const deleteUser = (id) =>{
        setUsers(users.filter(el => el.id !== id))
    }
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Город</th>
                    <th>Количество баллов</th>
                    <th>Действие</th>
                </tr>
                </thead>
             <tbody>
             {users.map(el =>{
                 if(el.is_admin === false){
                    return (<tr key={el.phone}> 
                        <td>{el.first_name}</td>
                        <td>{el.phone}</td>
                        <td>{el.location}</td>
                        <td>{el.points_amount}</td>
                        <td><NewButton onClick={()=> deleteUser(el.id)}>Удалить</NewButton></td>
                       </tr>)
                 }
           
            })}
             </tbody>
           
            </table>
         
        </div>
    );
};

export default UserList;