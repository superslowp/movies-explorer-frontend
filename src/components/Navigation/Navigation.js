import React from "react";
import "./Navigation.css"
import { NavLink } from "react-router-dom";

const Navigation = () => {

    const setActiveLink = (navState) => {
        return navState.isActive
            ? 'navigation__link navigation__link_type_active'
            : 'navigation__link'
    }
    return (
        <div className="navigation">
            <NavLink
                className={setActiveLink}
                to="/movies">
                Фильмы
            </NavLink>
            <NavLink
                className={setActiveLink}
                to="/saved-movies">
                Сохранённые фильмы
            </NavLink>
        </div>
    )
};

export default Navigation;