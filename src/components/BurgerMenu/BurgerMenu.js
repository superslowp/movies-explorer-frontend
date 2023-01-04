import React from "react";
import { NavLink } from "react-router-dom";
import "./BurgerMenu.css"

const BurgerMenu = ({ isMenuOpen, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('burger__container_visible')) {
            onClose();
        }
    }

    const setActiveLink = (navState) => {
        return navState.isActive
            ? 'burger__link burger__link_active'
            : 'burger__link'
    }

    return (
        <nav
            className={`burger__container ${isMenuOpen ? "burger__container_visible" : ""}`}
            onClick={handleOverlayClick}
        >
            <button
                className="burger__close-button"
                onClick={onClose}
            />
            <div className="burger__menu">
                <ul className="burger__list">
                    <li
                        className="burger__item"
                        onClick={onClose}
                    >
                        <NavLink to="/" className={setActiveLink}>
                            Главная
                        </NavLink>
                    </li>
                    <li
                        className="burger__item"
                        onClick={onClose}
                    >
                        <NavLink to="/movies" className={setActiveLink}>
                            Фильмы
                        </NavLink>
                    </li>
                    <li
                        className="burger__item"
                        onClick={onClose}
                    >
                        <NavLink to="/saved-movies" className={setActiveLink}>
                            Сохраненные фильмы
                        </NavLink>
                    </li>
                </ul>
                <NavLink to="/profile" className="header__account-link header__account-link_visible header__account-link_margin_auto">
                    Аккаунт
                </NavLink>
            </div>
        </nav>
    )
}

export default BurgerMenu;