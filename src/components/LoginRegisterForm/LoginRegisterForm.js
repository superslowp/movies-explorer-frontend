import React from "react";
import { NavLink } from "react-router-dom";
import './LoginRegisterForm.css';
import logo from '../../images/movies-explorer-logo.svg';

const AuthForm = ({ formTitle, children, buttonText, formText, link, linkText, isRegistration }) => {
    return (
        <>
            <form className="auth-form">
                <img className="auth-form__logo" src={logo} alt="логотип " />
                <h1 className="auth-form__title">{formTitle}</h1>
                <fieldset className="auth-form__fieldset">
                    {children}
                </fieldset>
                <button type='submit' className="auth-form__submit">
                    {buttonText}
                </button>
            </form>
            <p className="auth-form__text">
                {formText}
                <NavLink className="auth-form__text auth-form__link" to={link}>
                    {linkText}
                </NavLink>
            </p>
        </>
    );
};

export default AuthForm;