import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [card, setCard] = React.useState({})

    //отрисовать все карточки
    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards)
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }, [])


    //обновить стейт с инфой юзера
    React.useEffect(() => {
        Promise.all([api.getUserData()])
            .then(([data]) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }, [])

    // поставить и удалить лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards)
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
        }
        else
            api.setLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards)
                })
                .catch((err) => {
                    console.log((`${err}`))
                })
    }

    
    //удалить карточку
    function handleCardDelete() {
        
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }

    function handleCardDeleteApproved (card) {
        setCard(card)
        setIsConfirmPopupOpen(true)
    }


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


    //обновить данные профиля
    function handleUpdateUser(data) {
        api.editProfilePopup(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }

    //обновить аватар
    function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }

    //добавить карточку
    function handleAddPlaceSubmit(evt) {
        api.addNewCard({
            name: evt.place,
            link: evt.link
        })
            .then((newCard) => {
                setCards([...cards, newCard]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Header />
                <Main
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                    onConfirmDelete={handleCardDeleteApproved}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                // onCardDelete={handleCardDelete}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}>
                </EditProfilePopup>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}>
                </AddPlacePopup>


                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                >
                </EditAvatarPopup>


                <ConfirmDeletionPopup
                    onClose={closeAllPopups}
                    isOpen={isConfirmPopupOpen}
                    onConfirmDeletion={handleCardDelete}
                   
   
                >
                </ConfirmDeletionPopup>


                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />


                <Footer />

            </div>

        </CurrentUserContext.Provider>
    );

}

export default App;