import React from "react";
import './Register.css';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';

const Register = () => {
    const isError = false;
    return (
        <LoginRegisterForm
            formTitle="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            formText="Уже регистрировались? "
            link="/signin"
            linkText="Войти"
        >
            <label className='form__label'>Имя</label>
            <input
                required
                type='text'
                className='form__input'
            />
            <label className='form__label'>E-mail</label>
            <input
                required
                type='email'
                className='form__input'
            />
            <label className='form__label'>Пароль</label>
            <input
                required
                type='password'
                className='form__input'
            />
            {isError && <span className="form__label form__label_type_error">Что-то пошло не так...</span>}
        </LoginRegisterForm>
    )
}

export default Register;