export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_photo ${props.card.name ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__close-button popup__close-button_type_photo"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__photo"  style={{ backgroundImage: `url(${props.card.link})` }}/>
        <h3 className="popup__text">{props.card.name}</h3>
      </div>
    </div>
  );
}
