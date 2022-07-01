import React, { useState } from 'react';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Modal from '../UI/modal/Modal';
import NewButton from '../UI/NewButton/NewButton';
import classes from './MainPage.module.css'
import logo from '../../assets/logo.png'
import Footer from '../UI/footer/Footer';
const MainPage = () => {


    const [registrationModal, setRegistrationModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    return (
        <div className={classes.mainPage}>
            
            <header className={classes.header}>
                    <div className="container">
                        <div className={classes.headerWrapper}>
                        <div className={classes.logo}>
                                <img src={logo} alt="Ruizzi" />

                        </div>
                        <div className={classes.bgenter}>
                            <button className={classes.enterButton}
                            onClick={() => setLoginModal(true)}
                            > Войти 
                            </button> 
                            </div>
                                
                    </div>
                       
                                </div>
            </header>
            <main>
            <section className="container">
            <div className={classes.infoWrapper}>
                <h2>Смотрите рекламу и получайте за это награды</h2>
                
                <p>Каждый день вы смотрите сотни рекламных объявлений просто так. Благодаря нашему сервису вы 
                    сможете получать за это ценные призы и подарки. Регистрируйтесь и начинайте зарабатывать!
                </p>
                <Modal visible={registrationModal} setVisible={setRegistrationModal}> 
                        <Registration />
                </Modal>
                <Modal visible={loginModal} setVisible={setLoginModal}> 
                       <Login />
                </Modal>
                <div className={classes.buttonsBlock}>
              
                <NewButton 
                onClick={()=> setRegistrationModal(true)}> Зарегистрироваться </NewButton>    
                </div>
            </div>

            </section>
            <section className={classes.benefits}>
                <div className="container">
                <div className={classes.icons}>
                <span>Регистрируйтесь в сервисе</span>
                <span>Смотрите рекламные предложения в удобное вам время</span>
                <span>Копите бонусы за просмотры</span>
                <span>Получайте подарки или скидки за накопленные бонусы</span>
            </div>
                </div>
            </section>
            </main>
       <Footer/>
         
         
        </div>
    );
};

export default MainPage;