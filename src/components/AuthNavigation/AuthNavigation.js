import React from "react";
import './AuthNavigation.css'
import { NavLink } from 'react-router-dom';

const AuthNavigation = () => {
    return (
        <div className="AuthNavigation">
            <NavLink to="/signup" className="AuthNavigation__register">
                Регистрация
            </NavLink>
            <NavLink to="/signin" className="AuthNavigation__login">
                Войти
            </NavLink>
        </div>
    );
};

export default AuthNavigation;