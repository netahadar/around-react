export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
    console.log(props.card);
  }

  return (
    <li className="gallery__item">
      <button
        className="gallery__trash-button"
        type="button"
        aria-label="delete button"
      ></button>
      <div
        className="gallery__photo"
        style={{ backgroundImage: `url(${props.card.link})` }}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="gallery__description">
        <h2 className="gallery__text">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button
            className="gallery__like-button"
            type="button"
            aria-label="like button"
          ></button>
          <p className="gallery__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
