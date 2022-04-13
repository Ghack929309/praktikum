import React from 'react';
import {useHistory} from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";

export const CurrentUserContext = React.createContext();
export function CurrentProvider ({children}){
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState();

    const [currentUser, setCurrentUser] = React.useState('');

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        api.getUserInfo().then((userData) => {

            setCurrentUser(userData);
        });
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(undefined);
    }



    function handleUpdateUser(userUpdate) {
        api.setUserInfo(userUpdate).then((newUserData) => {
            setCurrentUser(newUserData);

            closeAllPopups();
        });
    }

    function handleUpdateAvatar(avatarUpdate) {
        api.setUserAvatar(avatarUpdate).then((newUserData) => {
            setCurrentUser(newUserData);

            closeAllPopups();
        });
    }



    React.useEffect( () => {
        api.getCardList().then((cardData) => {
            setCards(cardData);
        });
    }, []);

    // this code runs when the component mounts
    React.useEffect(() => {
        // get token and email from local storage
        const token = localStorage.getItem('jwt');
        // verify token
        if (token){
            auth.checkToken(token).then((res) => {
                if (res){
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push('/');
                } else {
                    localStorage.removeItem('jwt');
                }
            });
        }
    }, []);



    function handleAddPlaceSubmit(newCard) {
        api.addCard(newCard).then((newCardFull) => {
            setCards([
                ...cards,
                newCardFull,
            ]);

            closeAllPopups();
        });
    }
    function onRegister({ email, password }){
        auth.register(email, password)
            .then((res) => {
                try {
                    if (res.data._id){
                        // all good
                        setTooltipStatus('success');
                        setIsInfoToolTipOpen(true);
                        // log user in
                       history.push('/signin')
                    } else {
                        // incorrect data
                        setTooltipStatus('fail');
                        setIsInfoToolTipOpen(true);
                    }
                } catch (e){
                    // user already exists
                    setTooltipStatus('fail');
                    setIsInfoToolTipOpen(true);
                }
            });
    }
    function onLogin({ email, password }){
        auth.login(email, password).then((res) => {
            if (res.token){
                setIsLoggedIn(true);
                setEmail(email);
                localStorage.setItem('jwt', res.token);
                history.push('/');
            }
        })
    }
    function onSignOut(){
        setIsLoggedIn(false);
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        history.push('/signin');
    }
    return(
        <CurrentUserContext.Provider value={{setCards,email,setEmail,currentUser,onSignOut,cards,handleEditProfileClick,handleAddPlaceClick
            ,handleEditAvatarClick,setSelectedCard,isLoggedIn
            ,onRegister,isEditProfilePopupOpen,handleUpdateUser,isAddPlacePopupOpen,handleAddPlaceSubmit,
            onLogin,isEditAvatarPopupOpen,handleUpdateAvatar,closeAllPopups,selectedCard,
            isInfoToolTipOpen,tooltipStatus,password,setPassword}}>
            {children}
        </CurrentUserContext.Provider>
    )
}
