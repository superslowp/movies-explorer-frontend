import React from 'react';
import './PopupWithMessage.css';
import ok from '../../images/success.png';
import fail from '../../images/fail.png';

function PopupWithMessage({ popupText, isError, isOpen, onClose }) {

    const close = () => {
        onClose();
    }

    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            onClick={close}
        >
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose} />
                <div className="popup__content">
                    <img
                        className="popup__status-image"
                        src={!isError ? ok : fail}
                        alt="Статус операции"
                    />
                    <h2 className="popup__status-text">{popupText}</h2>
                </div>
            </div>
        </div>
    );
}

export default PopupWithMessage;