import React from "react";
import { NavLink } from "react-router-dom";
import './LoginRegisterForm.css';
import logo from '../../images/movies-explorer-logo.svg';

const LoginRegisterForm = ({
    formTitle,
    children,
    buttonText,
    formText,
    link,
    linkText,
    handleSubmit,
    values,
    isValid
}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(values);
    }

    return (
        <>
            <form
                className="auth-form"
                onSubmit={handleFormSubmit}
            >   <NavLink to="/" className="auth-form__link">
                    <img className="auth-form__logo" src={logo} alt="логотип " />
                </NavLink>
                <h1 className="auth-form__title">{formTitle}</h1>
                <fieldset className="auth-form__fieldset">
                    {children}
                </fieldset>
                <button type='submit' className={`auth-form__submit ${!isValid ? 'auth-form__submit_disabled' : ''}`} disabled={!isValid}>
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

export default LoginRegisterForm;