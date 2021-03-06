import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context';
import Gift from '../../UserCabinet/Gift/Gift';

import cl from './Cashout.module.css'
const Cashout = () => {

    const [prizes, setPrizes] = useState([]);
    const [formInfo, setFormInfo] = useState({
    description: '',
    title: '',
    cost: 0
})
const [file, setFile] = useState();
const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);



        useEffect(()=>{
            const response = axios.get('http://ruizzi.ru/api/prize/',{headers: {
        Authorization: `Bearer ${token}`
        }}).then((res)=>{
            console.log(res.data);
            setPrizes(res.data)
        })
           }, [])

           const UploadContent = (event) => {
            event.preventDefault();
            if (event.target.files[0]) {
                setFile(event.target.files[0]);
            }
        };
           const handleForm = (e) =>{
            const target = e.target;
            const value= target.value;
            const name = target.name;
        
            setFormInfo({
              ...formInfo,
              [name]: value
            });
        }

        const addPrize = (e) =>{
            e.preventDefault();
            const formData = new FormData();
        
            formData.append('image', file);
            formData.append('description', formInfo.description);
            formData.append('title', formInfo.title);
            formData.append('cost', formInfo.cost);
            axios.post('http://ruizzi.ru/api/prize/',  
            formData,
                {headers: {
                    Authorization: `Bearer ${token}`
                }
            }
                ).then(res => {
                    const response = axios.get('http://ruizzi.ru/api/prize/', {headers: {
                        Authorization: `Bearer ${token}`
                        }}).then((res)=>{
                        
                            setPrizes(res.data)
                        })
                })
        }


    return (
        <div>
            ???????????? ???????????? ???? ?????????? ????????????:
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>??????</th>
                    <th>??????????????</th>
                    <th>??????????</th>
                    <th>?????????????????? ????????</th>
                </tr>
                </thead>
             <tbody>
           <p>?????? ???????????? ???? ?????????? ????????????</p>
             </tbody>
           
            </table>
            <hr />
        
        <div>
        <div>
             <div className={cl.prizeContainer}>
                 {prizes.map(prize => {
                     return (
                         <div className={cl.prizeBox} key={prize.id}>
                             <img src={prize.image} alt={prize.id} />
                             <h3>{prize.title}</h3>
                             <p>{prize.description}</p>
                             <p>??????????????????: <strong>{prize.cost} ????????????.</strong></p>
                         </div>
                     )                })}
        </div>
        <form onSubmit={addPrize}>
            <input type="file" onChange={UploadContent}/>
            <input type="text" onChange={handleForm} placeholder='????????????????' name="title" />
            <input type="text" onChange={handleForm} placeholder='????????????????' name="description"/>
            <input type="text" onChange={handleForm} placeholder='????????????c????' name="cost"/>
            <input type="submit" value="???????????????? ??????????????????????"/>
        </form>
        </div>
        </div>
        </div>
    );
};

export default Cashout;