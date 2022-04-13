import React, {useContext} from 'react';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card({card }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  const {currentUser, cards,setSelectedCard, setCards}=useContext(CurrentUserContext)
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleCardDelete(card) {
        api.removeCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
        });
    }
    function handleCardLike(card) {
        const isLiked = card.likes?.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        });
    }

    const isLiked = card.likes?.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

    let isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={()=>handleCardClick(card)}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={()=>handleCardDelete(card)}/>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={()=>handleCardLike(card)}/>
          <p className="card__like-count">{card?.likes?.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
