import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export default function Card(props) {
  //Subscribing to user info context:
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  // Checking if the current user is the owner of the current card:
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable to set in `className` for the delete button:
  const galleryTrashButtonClassName = `gallery__trash-button ${
    isOwn ? "gallery__trash-button_visible" : "gallery__trash-button_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  // Create a variable to set in `className` for the like button:
  const galleryLikeButtonClassName = `gallery__like-button ${isLiked && 'gallery__like-button_active'}`;

  return (
    <li className="gallery__item">
      <button
        className={galleryTrashButtonClassName}
        type="button"
        aria-label="delete button"
        onClick={handleDeleteClick}
      ></button>
      <div
        className="gallery__photo"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />
      <div className="gallery__description">
        <h2 className="gallery__text">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button
            className={galleryLikeButtonClassName}
            type="button"
            aria-label="like button"
            onClick={handleLikeClick}
          ></button>
          <p className="gallery__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
