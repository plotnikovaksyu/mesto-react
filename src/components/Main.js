import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onConfirmDelete, cards,  onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__info-container">
                    <button className="profile__avatar-button" type="button" aria-label="Изменить аватар">
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" onMouseDown={onEditAvatar} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__discription">{currentUser.about}</p>
                        <button className="profile__edit-button profile__edit-button_profile" type="button"
                            aria-label="Изменить" onMouseDown={onEditProfile}>
                        </button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onMouseDown={onAddPlace}>
                </button>
            </section>

            <section className="grid">
                <ul className="grid__elements">
                    {cards.map((card) => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onConfirmDelete={onConfirmDelete}
                                onCardLike={onCardLike}
                                // onCardDelete={onCardDelete}
                                />
                        )
                    })
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main;