import React from "react";
import './Login.css';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';

const Login = () => {
    const isError = false;
    return (
        <LoginRegisterForm
            formTitle="Рады видеть!"
            buttonText="Войти"
            formText="Еще не зарегистрированы? "
            link="/signup"
            linkText="Регистрация"
        >   <label className='form__label'>E-mail</label>
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

export default Login;