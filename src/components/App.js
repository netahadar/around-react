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
import AddPlacePopup from "./AddPlacePopup";

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
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
  }

  function handleAddPlaceSubmit(newData) {
    api
      .createNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <section>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
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
