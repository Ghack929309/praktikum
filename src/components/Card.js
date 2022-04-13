import React, {useContext} from 'react';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card({handleCardClick,handleDeleteClick,card }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };
  const {currentUser,cards,setCards}=useContext(CurrentUserContext)
    function handleCardDeleteClick() {
        handleDeleteClick(card);
    }
    function handleClick() {
        handleCardClick(card);
    }
    function handleCardLike(card) {
        console.log(currentUser._id)
        const isLiked = card.likes?.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(prev=>[...prev,newCards]);
        });
    }

    const isLiked = card.likes?.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;
    console.log(card)
    let isOwn =true //card.owner._id === currentUser._id;
    console.log(isOwn)
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={handleClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDeleteClick}/>
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
