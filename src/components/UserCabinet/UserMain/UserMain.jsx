import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { AuthContext } from '../../../context';
import Footer from '../../UI/footer/Footer';
import NewButton from '../../UI/NewButton/NewButton';
import UserHeader from '../UserHeader/UserHeader';

import cl from './UserMain.module.css'
const UserMain = () => {
    const {loginUser,setLoginUser, setToken, token} = useContext(AuthContext);
    const [balance, setBalance] = useState(1) 
    const [currentSlide, setCurrentSlide] = useState(0)
    const [hasSlides, setHasSlides] = useState(true)
    const [images, setImages] = useState([]);
    const {setIsAuth} = useContext(AuthContext);
    const logout = () =>{

        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        setIsAuth({'auth' : false, 'user': ''});
    }

    const next = async (id) => {

        const response = await axios.post(`http://ruizzi.ru/api/advertisement/${id}/watch/`, {}, {headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
            }})
        const res = await axios.get('http://ruizzi.ru/api/user/me/',{headers: {
            Authorization: `Bearer ${token}`
            }}).then((res)=>{
                console.log(res.data);
                setLoginUser(res.data);
                setCurrentSlide(currentSlide+1);
                console.log(images.length);
                if (currentSlide+2 >= images.length){
                    console.log('dd')
                    setHasSlides(false);
                }else{
                    console.log(currentSlide+2)
                }
            })

    };



        useEffect(()=>{
     if(localStorage.getItem('auth')) {
                setToken(localStorage.getItem('token'));
                axios.get('http://ruizzi.ru/api/user/me',{headers: {
            Authorization: `Bearer ${token}`
            }}).then(res => {
                console.log(res)
                setLoginUser(res.data)
                localStorage.setItem('loginUser', loginUser);
                localStorage.setItem('auth', 'auth');
             
            });
        }

        const response = axios.get('http://ruizzi.ru/api/advertisement/',{headers: {
        Authorization: `Bearer ${token}`
        }}).then((res)=>{
            console.log(res);
            if(res.data.length > 0){
                setImages(res.data);
                setCurrentSlide(0);
            }else{
            setHasSlides(false)
            }
        })
        }, [])

    return (
        <div className={cl.mainContainer}>
            <UserHeader firstName={loginUser.first_name} middleName={loginUser.middle_name} lastName={loginUser.last_name} points={loginUser.points_amount}/>
           
            <div style={{textAlign: 'center', margin: '20px auto'}}>
                {
                    !hasSlides ?  <div style={{color: 'black'}}>На сегодня рекламные объявления закончились! Зайдите чуть позже</div> 
                    
                    :  

                    <div style={{width: '1000px', maxWidth: '100%', margin: '0 auto'}}>
                       
                    <Carousel autoPlay={false} showIndicators={false} showArrows={false} showThumbs={false} swipeable={true} selectedItem={currentSlide}>
                    {
                        images.map(image =>{
                            return (
                                <div key={image.image}>
                                    <a href={image.url} target="_blank">
                                    <img src={image.image} />
                                <p className="legend">{image.description}</p>
                                    </a>
                                    <NewButton 
                                    onClick={() => next(`${image.id}`)} >
                                    Следующий баннер
                                  </NewButton>
                            </div>
                            )
                        })
                    }
                    </Carousel>
        
                  
        
                        </div>
                }   
            </div>
      <Footer/>
        </div>
    );
};

export default UserMain;