import React, { useState } from 'react';
import classes from './Footer.module.css'
import logo from '../../../assets/logo.png'
import tg from '../../../assets/tg.png'
import About from '../../About/About';
import Modal from '../modal/Modal'
import Ads from '../../Ads/AdsPage'
import { Link } from 'react-router-dom';
const Footer = () => {

    const [aboutModal, setAboutModal] = useState(false)
    const [adsModal, setAdsModal] = useState(false)

    return (
        <footer className={classes.footer}>
        <div className="container">
            <div className={classes.footerContainer}>
            <div className={classes.footerCol}>
                <div className={classes.logo}>
                <img src={logo} alt="" />
                </div>
              
                <p>2022. Все права защищены.</p>
            </div>
            <div className={classes.footerCol}>
                <div className={classes.bottomMenu}>
                    <ul>
                        <li><button  onClick={() => setAboutModal(true)}>О нас</button></li>
                        <li><button  onClick={() => setAdsModal(true)}>Рекламодателям</button></li>
                    </ul>
                </div>
            </div>
            <Modal visible={aboutModal} setVisible={setAboutModal}> 
                <About />
            </Modal>
            <Modal visible={adsModal} setVisible={setAdsModal}> 
                <Ads />
            </Modal>
            <div className={classes.footerCol}>
                <p><a href="mailto:Izziru@mail.ru" className={classes.mailLink}>Izziru@mail.ru</a></p>
                <div>
                  <a href="https://t.me/ruizzu" target="_blank"><img src={tg} alt=""/></a>  
                </div>
            </div>
            </div>
           
        </div>
    </footer>
    );
};

export default Footer;