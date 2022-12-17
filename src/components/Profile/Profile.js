import React from "react";
import Header from "../Header/Header";
import './Profile.css';

const Profile = ({ onSubmit, onExit }) => {
    return (
        <>
            <Header isLoggedIn={true} />
            <form className="profile__form">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <fieldset className="profile__fieldset">
                    <label className="profile__input-wrapper">
                        <span className="profile__label">Имя</span>
                        <input
                            required
                            type='text'
                            className='profile__input'
                            value={"Виталий"}
                        />
                    </label>
                    <div className="profile__line"></div>
                    <label className="profile__input-wrapper">
                        <span className="profile__label">E-mail</span>
                        <input
                            required
                            type='text'
                            className='profile__input'
                            value={"pochta@ya.ru"}
                        />
                    </label>
                </fieldset>
                <button
                    type='submit'
                    className="profile__submit"
                    onClick={onSubmit}
                >
                    Редактировать
                </button>
                <button
                    className="profile__exit"
                    onClick={onExit}
                >
                    Выйти из аккаунта
                </button>
            </form>
        </>
    );
}

export default Profile;