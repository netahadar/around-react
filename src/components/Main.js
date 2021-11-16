import React from "react";
import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  //Subscribing to user info context:
  const currentUser = React.useContext(CurrentUserContext);

  //States for getting initial cards from server:
  const [cards, setCards] = React.useState([]);

  //API request for getting initial cards data:
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  function handleCardLike(card) {
    // Check if card was already liked:
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(c => c._id !== card._id)
      setCards(newCards);
  }
    );
}

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar-container"
          style={{ backgroundImage: `url("${currentUser.avatar}")` }}
        >
          <button
            className="profile__avatar-edit"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="edit button"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job-description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="add button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
