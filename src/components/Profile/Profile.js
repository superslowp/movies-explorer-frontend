import React from "react";
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Profile.css';

const Profile = ({ handleLogout, handleUpdateUser, apiMessage, isError }) => {

    const currentUser = React.useContext(CurrentUserContext)
    
    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,        
    } = useFormAndValidation()

    const logout = (e) => {
        e.preventDefault();
        handleLogout();
    }

    const onSubmit = (e) => {
        e.preventDefault();        
        handleUpdateUser(values);        
    }

    React.useEffect(() => {
        resetForm({ name: currentUser?.name, email: currentUser?.email },{},false)
      }, [currentUser])
    
    const isSubmitDisabled = () => { 
        if (!isValid) {
            return true;
        }
        if (!currentUser || !values) {            
            return true;            
        }
        if (values.name === currentUser.name && values.email === currentUser.email) {         
            return true;
        }        
        return false;
    }

    return (
        <>
            <Header isLanding={false} />
            <form
                className="profile__form"
                onSubmit={onSubmit}
            >
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <fieldset className="profile__fieldset">
                    <label className="profile__input-wrapper">
                        <span className="profile__label">Имя</span>
                        <input
                            required
                            onChange={handleChange}
                            type='text'
                            name='name'
                            id='name'
                            className='profile__input'
                            value={values.name || ''}
                            minLength='2'
                            maxLength='30'
                        />
                    </label>
                    {!isValid && errors.name && <span className="profile__label profile__label_type_error">{`${errors.name}`}</span>}
                    <div className="profile__line"></div>
                    <label className="profile__input-wrapper">
                        <span className="profile__label">E-mail</span>
                        <input
                            required
                            type='email'
                            className='profile__input'
                            value={values.email || ''}
                            onChange={handleChange}
                            name='email'
                            id='email'
                        />
                    </label>
                    {!isValid && errors.email && <span className="profile__label profile__label_type_error">{`${errors.email}`}</span>}                    
                </fieldset>
                <button
                    type='submit'
                    className={`profile__submit ${isSubmitDisabled() && 'profile__submit_disabled'}`}
                    onClick={onSubmit}
                    disabled={isSubmitDisabled()}
                >
                    Редактировать
                </button>                
                <button
                    className="profile__exit"
                    onClick={logout}
                >
                    Выйти из аккаунта
                </button>
            </form>
        </>
    );
}

export default Profile;