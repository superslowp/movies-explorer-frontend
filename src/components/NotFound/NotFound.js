import React from "react";
import { NavLink } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound">
            <h1 className="notfound__title">404</h1>
            <h1 className="notfound__subtitle">Страница не найдена</h1>
            <NavLink to="/" className="notfound__link">Назад</NavLink>
        </div>
    )
};

export default NotFound;