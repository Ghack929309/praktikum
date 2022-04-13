import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
 const {email,onSignOut,cards,handleEditProfileClick,handleAddPlaceClick
   ,handleEditAvatarClick,handleCardClick,handleCardLike,handleCardDelete,isLoggedIn
   ,onRegister,isEditProfilePopupOpen,isAddPlacePopupOpen,handleAddPlaceSubmit,
   onLogin,isEditAvatarPopupOpen,handleUpdateAvatar,closeAllPopups,selectedCard,
   isInfoToolTipOpen,tooltipStatus}=React.useContext(CurrentUserContext)

  return (
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut}/>
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <footer className="footer page__section">
          <p className="footer__copyright">
            © 2021 Around
          </p>
        </footer>
        <EditProfilePopup isOpen={isEditProfilePopupOpen}  onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
        <PopupWithForm title="Are you sure?" name="remove-card" buttonText="Yes" />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={tooltipStatus}/>
      </div>
  );
}

export default App;
