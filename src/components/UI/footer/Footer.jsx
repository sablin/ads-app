import React from 'react';
import classes from './Footer.module.css'
import logo from '../../../assets/logo.png'

const Footer = () => {
    return (
        <footer className={classes.footer}>
        <div className="container d-flex">
            <div className="col-4">
                <img src={logo} alt="" />
                <p>2022. Все права защищены.</p>
            </div>
            <div className="col-4">
                <div className={classes.bottomMenu}>
                    <ul>
                        <li><a href="/">О нас</a></li>
                        <li><a href="/">Техническая поддержка</a></li>
                        <li><a href="/">Рекламодателям</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-4">
                <p><a href="">+7 (999) 999-99-99</a></p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;