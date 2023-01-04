import { useEffect } from "react";
import './Login.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../utils/constants";

const Login = ({ isLoggedIn, handleLogin }) => {

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
            formTitle="Рады видеть!"
            buttonText="Войти"
            formText="Еще не зарегистрированы? "
            link="/signup"
            linkText="Регистрация"
            handleSubmit={handleLogin}
            values={values}
            isValid={isValid}
        >
            <label className='form__label'>E-mail</label>
            <input
                type='email'
                onChange={handleChange}
                name='email'
                id='email'
                className={`form__input ${errors.email && 'form__input_color_red'}`}
                value={values.email || ''}
                pattern={EMAIL_PATTERN}
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

export default Login;