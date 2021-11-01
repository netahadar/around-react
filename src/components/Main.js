import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

export default function Main(props) {
  // States for getting user data from sever:
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  //States for getting initial cards from server:
  const [cards, setCards] = React.useState([]);

  //API request for getting user data:
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(console.log);
  }, []);

  //API request for getting initial cards data:
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar-container"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <button
            className="profile__avatar-edit"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="edit button"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job-description">{userDescription}</p>
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
            return (<Card card={card} key={card._id} onCardClick={props.onCardClick} />)
          })}
        </ul>
      </section>
    </main>
  );
}
