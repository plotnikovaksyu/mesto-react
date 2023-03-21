import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [place, setPlace] = React.useState(' ');
    const [link, setLink] = React.useState(' ');

    const placeRef = React.useRef();
    const linkRef = React.useRef();


    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            place: placeRef.current.value,
            link: linkRef.current.value,
        });
    }


    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            place,
            link
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            label="Сохранить"
            buttonText="Сохранить"
            state="disabled"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_place" id="input-place" type="text" name="place"
                required placeholder="Название" minLength="2" maxLength="30" ref={placeRef} onChange={evt => setPlace(evt.target.value)} />
            <span id="input-place-error" className="popup__text-error"></span>
            <input className="popup__input popup__input_img" id="input-img" type="url" required name="img"
                placeholder="Ссылка на картинку" ref={linkRef} onChange={evt => setLink(evt.target.value)} />
            <span id="input-img-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;