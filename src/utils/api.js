class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //проверка ответа сервера на ошибки
    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так =( Ошибка: ${res.status}`);
    }

    //универсальный запрос
    _request(url, options) {
        return fetch(url, options).then(this._checkRequest)
    }

    //загрузка данных о пользователе
    getUserData() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
    };



    //редактирование профиля 
    editProfilePopup({ name, about }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
    }


    //обновление аватарки
    updateAvatar({ avatar }) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
    }



    //отрисовка карточек с сервера
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }


    //добавление новых карточек
    addNewCard(values) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: values.place,
                link: values.img
            })
        })
    }


    //поставить лайк
    setLike(_id) {
        return this._request(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    //удалить лайк
    deleteLike(_id) {
        return this._request(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }


    //удаление карточек
    deleteCard(_id) {
        return this._request(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
}





export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '831d19d2-f73f-4dd0-b242-f33cbf2eeb23',
        'Content-Type': 'application/json'
    }
})


