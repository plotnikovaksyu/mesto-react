import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsConfirmPopupOpen(false)
        setSelectedCard({})
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }



    return (
        <div className="page">
            <Header />
            <Main
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onConfirmDelete={setIsConfirmPopupOpen}
                onCardClick={handleCardClick}
            />
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                label="Сохранить"
                buttonText="Сохранить"
                state="disabled"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                children={
                    <>
                        <input className="popup__input popup__input_name" id="input-name" type="text" name="name" required
                            placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" />
                        <span id="input-name-error" className="popup__text-error"></span>
                        <input className="popup__input popup__input_discription" id="input-discription" type="text"
                            name="about" required placeholder="Исследователь океана" minLength="2"
                            maxLength="200" />
                        <span id="input-discription-error" className="popup__text-error"></span>
                    </>
                }
            />
            <PopupWithForm
                name="add"
                title="Новое место"
                label="Сохранить"
                buttonText="Сохранить"
                state="disabled"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                children={
                    <>
                        <input className="popup__input popup__input_place" id="input-place" type="text" name="place"
                            required placeholder="Название" minLength="2" maxLength="30" />
                        <span id="input-place-error" className="popup__text-error"></span>
                        <input className="popup__input popup__input_img" id="input-img" type="url" required name="img"
                            placeholder="Ссылка на картинку" />
                        <span id="input-img-error" className="popup__text-error"></span>
                    </>
                }
            />
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                label="Сохранить"
                buttonText="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                state="disabled"
                children={
                    <>
                        <input className="popup__input popup__input_avatar" id="input-avatar" type="url" required
                            name="avatar" placeholder="Ссылка на аватар" />
                        <span id="input-avatar-error" className="popup__text-error"></span>
                    </>
                }
            />
            <PopupWithForm
                name="checking"
                title="Вы уверены?"
                label="Подтвердить удаление"
                buttonText="Да"
                onClose={closeAllPopups}
                isOpen={isConfirmPopupOpen}
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />


            <Footer />
        </div>
    );

}

export default App;
