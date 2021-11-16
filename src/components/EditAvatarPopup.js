import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarLink = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarLink.current.value
        });
      }

    return(
        <PopupWithForm
            name="avatar"
            title="Change profile picture"
            buttonTitle="Save"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
          >
            <input
              className="popup__form-input"
              id="avatar-link"
              type="url"
              name="link"
              placeholder="avatar link"
              ref={avatarLink}
              required
            />
            <span id="avatar-link-error"></span>
          </PopupWithForm>
    )
}