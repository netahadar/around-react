import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  //submit handler:
  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values to the external handler
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      buttonTitle="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input"
        id="name-input"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="full name"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="name-input-error"></span>
      <input
        className="popup__form-input"
        id="job-input"
        type="text"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="job title"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="job-input-error"></span>
    </PopupWithForm>
  );
}
