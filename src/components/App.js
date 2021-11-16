import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePostPopup from "./DeletePostPopup";

function App() {
  //State for edit avatar popup:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  //State for edit profile popup:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  //State for add post popup:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //State for delete post popup:
  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] =
    React.useState(false);

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

  //State for deleted card
  const [deleteCard, setDeletedCard] = React.useState({
    _id: "",
  });

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

  function handleDeletePostClick(card) {
    setIsDeletePostPopupOpen(true);
    setDeletedCard({ _id: card._id });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePostPopupOpen(false);
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
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(newData) {
    api
      .setUserAvatar(newData)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    // Check if card was already liked:
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cardsState) =>
          cardsState.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch(console.log);
  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(newData) {
    api
      .createNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onDeletePostClick={handleDeletePostClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
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
          <DeletePostPopup
            isOpen={isDeletePostPopupOpen}
            onClose={closeAllPopups}
            onDeletePostSubmit={handleCardDelete}
          />
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
