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

const UserMain = () => {
    const {loginUser, setLoginUser, setToken, token} = useContext(AuthContext);
    const [balance, setBalance] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hasSlides, setHasSlides] = useState(true);
    const [images, setImages] = useState([]);
    const {setIsAuth} = useContext(AuthContext);
    const [hiddenCarousel, setHiddenCarousel] = useState(true)

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
        setHiddenCarousel(false)
        setCurrentSlide(pre => pre + 1);

        await AdvertisementApi.viewingAdsByCurrentUser(images[currentSlide].id, {})
        const res = await UserApi.userInfo()
        setLoginUser(res.data);

        if (currentSlide + 2 >= images.length) {
            console.log('dd');
            setHasSlides(false);
        } else {
            console.log(currentSlide + 2);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setToken(TokenService.getLocalAccessToken());
            UserApi.userInfo()
                .then((res) => {
                    console.log(res);
                    setLoginUser(res.data);
                    localStorage.setItem('loginUser', loginUser);
                    localStorage.setItem('auth', 'auth');
                })
        }

        AdvertisementApi.fetch()
            .then((res) => {
                console.log(res);
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
                    <div style={{color: 'black'}}>
                        На сегодня рекламные объявления закончились! Зайдите чуть позже
                    </div>
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
                                return (
                                    <div key={image.image} className={cl.imageBox}
                                         style={{display: !index ? "block" : hiddenCarousel ? "none" : "block"}}>
                                        <img src={image.image} alt={image.image}/>
                                        <p className="legend" id={cl.customLegend}>
                                            <a href={image.url} target="_blank"> {image.description}</a>
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
