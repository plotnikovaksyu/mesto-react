import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onConfirmDelete}) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([data, cards]) => {
                setUserName(data.name)
                setUserDescription(data.about)
                setUserAvatar(data.avatar)
                setCards(cards)
            })
            .catch((err) => {
                console.log((`${err}`))
            })
    }, [])

    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__info-container">
                    <button className="profile__avatar-button" type="button" aria-label="Изменить аватар">
                        <img className="profile__avatar" src={`${userAvatar}`} alt="Аватар профиля" onMouseDown={onEditAvatar} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <p className="profile__discription">{userDescription}</p>
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
                        <Card key={card._id} card={card} onCardClick={onCardClick} onConfirmDelete={onConfirmDelete}/>
                        )
                })
                }
                </ul>
            </section>
        </main>
    )
}

export default Main;