import React, {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";

function Main() {
    const { cards, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, handleCardClick }=useContext(CurrentUserContext)
  const imageStyle = { backgroundImage: `url(${CurrentUserContext.avatar})` };
  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}/>
        <div className="profile__info">
          <h1 className="profile__title">{CurrentUserContext.name}</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}/>
          <p className="profile__description">{CurrentUserContext.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}/>
      </section>
      <section className="places page__section">
        <ul className="places__list">
          {cards?.map((card, i) => (
            <Card
              key={i}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
