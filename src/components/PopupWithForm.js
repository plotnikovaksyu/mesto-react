// import React, { Children } from 'react';
import React from 'react';

function PopupWithForm({name, title, children, state, label, buttonText, isOpen, onClose}) {


    return (
        <section className={`popup popup_${name} ${isOpen ? "popup_is-opened" : " "}`}>
            <div className={`popup__container popup__container_${name}`}>
                <button className="popup__close" type="button" aria-label="Закрыть без сохранения" onMouseDown={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>

                <form className="popup__form" name={`${name}`} noValidate>
                    <fieldset className="popup__edit">
                        {children}
                        <button type="submit"
                            className={`popup__submit-button popup__submit-button_${state} popup__submit-button_${name}`} disabled
                            aria-label={label}>{buttonText}</button>
                    </fieldset>
                </form>


            </div>
        </section>
    )
}

export default PopupWithForm;