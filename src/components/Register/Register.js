import { useState, useEffect } from "react";
import './Register.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';
import { useNavigate } from "react-router-dom";

const Register = ({ isLoggedIn, handleRegister }) => {

    const navigate = useNavigate();

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
        setValues,
        setIsValid,
    } = useFormAndValidation()

    useEffect(() => {
        resetForm()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/movies");
        }
    }, [isLoggedIn]);

    return (
        <LoginRegisterForm
            formTitle="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            formText="Уже регистрировались? "
            link="/signin"
            linkText="Войти"
            handleSubmit={handleRegister}
            values={values}
            isValid={isValid}
        >
            <label className='form__label'>Имя</label>
            <input
                type='text'
                onChange={handleChange}
                name='name'
                id='name'
                className={`form__input ${errors.name && 'form__input_color_red'}`}
                value={values.name || ''}
                minLength='2'
                maxLength='30'
                required
            />
            {!isValid && errors.name && <span className="form__label form__label_type_error">{`${errors.name}`}</span>}
            <label className='form__label'>E-mail</label>
            <input
                type='email'
                onChange={handleChange}
                name='email'
                id='email'
                className={`form__input ${errors.email && 'form__input_color_red'}`}
                value={values.email || ''}
                required
            />
            {!isValid && errors.email && <span className="form__label form__label_type_error">{`${errors.email}`}</span>}
            <label className='form__label'>Пароль</label>
            <input
                type='password'
                onChange={handleChange}
                name='password'
                id='password'
                className={`form__input ${errors.password && 'form__input_color_red'}`}
                value={values.password || ''}
                required
            />
            {!isValid && errors.password && <span className="form__label form__label_type_error">{`${errors.password}`}</span>}
        </LoginRegisterForm>
    )
}

export default Register;