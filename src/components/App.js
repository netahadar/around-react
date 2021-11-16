import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  //State for edit avatar popup:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  //State for edit profile popup:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  //State for add post popup:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //State for full sized image popup:
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  //State for user data:
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  //API request for getting user data:
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch(console.log);
  }, []);

  function handleUpdateUser(newData) {
    api
      .setUserInfo(newData)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch(console.log);
    closeAllPopups();
  }

  function handleUpdateAvatar(newData) {
    api
      .setUserAvatar(newData)
      .then((res) => {
        console.log(res);
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch(console.log);
      closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <section>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupWithForm
            name="post"
            title="New place"
            buttonTitle="Create"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              className="popup__form-input"
              id="title-input"
              type="text"
              name="name"
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
              placeholder="Image link"
              required
            />
            <span id="link-input-error"></span>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm
            name="delete"
            title="Are you sure?"
            buttonTitle="Yes"
          />
          {/* <div className="popup popup_type_delete">
            <div className="popup__container">
              <button className="popup__close-button" type="button"></button>
              <form className="popup__form" name="delete">
                <h2 className="popup__form-title popup__form-title_delete">
                  Are you sure?
                </h2>
                <button className="popup__form-submit-button" type="submit">
                  Yes
                </button>
              </form>
            </div>
          </div> */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
