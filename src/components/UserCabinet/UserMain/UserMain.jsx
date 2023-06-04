import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {AuthContext} from '../../../context';
import Footer from '../../UI/footer/Footer';
import NewButton from '../../UI/NewButton/NewButton';
import UserHeader from '../UserHeader/UserHeader';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cl from './UserMain.module.css';
import UserApi from "../../../api/user.api";
import AdvertisementApi from "../../../api/advertisement.api";
import TokenService from "../../../services/token.service";
import noneFile from '../../../assets/none-banner.jpg'

const UserMain = () => {
    const {loginUser, setLoginUser, setToken} = useContext(AuthContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hasSlides, setHasSlides] = useState(true);
    const [images, setImages] = useState([]);
    const {setIsAuth} = useContext(AuthContext);
    const [hiddenCarousel, setHiddenCarousel] = useState(true)
    const [showInfo, setShowInfo] = useState(false);


    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        setIsAuth({auth: false, user: ''});
        TokenService.clearLocalTokens()
    };

    const initHiddenCarousel = useCallback((index) => {
        if (index === 0) {
            return false
        }

        return hiddenCarousel
    }, [currentSlide])

    const next = async () => {
        setShowInfo(false);
        setHiddenCarousel(false)
        setCurrentSlide(pre => pre + 1);

        await AdvertisementApi.viewingAdsByCurrentUser(images[currentSlide].id, {})
        const res = await UserApi.userInfo()
        setLoginUser(res.data);

        if (currentSlide + 1 >= images.length) {
            setHasSlides(false);
        } else {
           
        }
    };

    const showMore = () =>{
        setShowInfo(!showInfo);
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setToken(TokenService.getLocalAccessToken());
            UserApi.userInfo()
                .then((res) => {
                    setLoginUser(res.data);
                    localStorage.setItem('loginUser', loginUser);
                    localStorage.setItem('auth', 'auth');
                })
        }

        AdvertisementApi.fetch()
            .then((res) => {
                if (res.data.length > 0) {
                    setImages(res.data);
                    setCurrentSlide(0);
                } else {
                    setHasSlides(false);
                }
            });
    }, []);

    return (
        <div className={cl.mainContainer}>
            <UserHeader
                firstName={loginUser.first_name}
                middleName={loginUser.middle_name}
                lastName={loginUser.last_name}
                points={loginUser.points_amount}
            />

            <div>
                {!hasSlides ? (
                      <Fragment>
                        <img src={noneFile} alt="На сегодня реклама закончилась"  className={cl.noneBanner}/>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Carousel
                            autoPlay={false}
                            showIndicators={false}
                            showArrows={false}
                            showThumbs={false}
                            swipeable={false}
                            dynamicHeight={true}
                            renderArrowNext={(onClickHandler, hasNext) => {
                                const image = {id: 1}
                                return (
                                    <NewButton onClick={() => next(`${image.id}`)}>Следующий баннер</NewButton>
                                )
                            }}
                            selectedItem={currentSlide}>
                            {images.map((image, index) => {
                                const about = image.description.split('|');  
                                return (
                                    <div key={image.image} className={cl.imageBox}
                                         style={{display: !index ? "block" : hiddenCarousel ? "none" : "block"}}>
                                        <img src={image.image} alt={image.image}/>
                                        <p className="legend" id={cl.customLegend}>
                                            <button className={cl.moreButton} onClick={showMore}><i className="fa fa-info-circle" aria-hidden="true"></i> Подробнее</button>
                                            {showInfo 
                                            ?
 <a href={image.url} target="_blank" className={cl.imageInfo} style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}}> 
 {about[0]} <br/>
 {about[1]} <br/>
 {about[2]} 
 </a> 
 :
 null
                                            
                                            }
                                           
                                        </p>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </Fragment>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default UserMain;
