import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Pass the values to the external handler
    onAddPlaceSubmit({
        name: place,
        link: link
    });
  }

  return (
    <PopupWithForm
      name="post"
      title="New place"
      buttonTitle="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input"
        id="title-input"
        type="text"
        name="name"
        value={place}
        onChange={handlePlaceChange}
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
      />
      <span id="title-input-error"></span>
      <input
        className="popup__form-input"
        id="link-input"
        type="url"
        name="link"
        value={link}
        onChange={handleLinkChange}
        placeholder="Image link"
        required
      />
      <span id="link-input-error"></span>
    </PopupWithForm>
  );
}
