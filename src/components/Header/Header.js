import React from "react";
import './Header.css';
import logo from '../../images/movies-explorer-logo.svg';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { NavLink } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {

    const [isMenuOpen, setisMenuOpen] = React.useState(false);

    function openMenu() {
        setisMenuOpen(true);
    }

    function closeMenu() {
        setisMenuOpen(false);
    }

    return (
        <header className={`header ${!isLoggedIn ? 'header_background_gray' : null}`}>
            <NavLink to="/" className="header__link">
                <img className="header__logo" src={logo} alt="логотип сайта" />
            </NavLink>
            {!isLoggedIn && <AuthNavigation />}
            {isLoggedIn && <Navigation />}
            {isLoggedIn && <NavLink to="/profile" className="header__account-link">
                Аккаунт
            </NavLink>}
            {isLoggedIn && !isMenuOpen && <button onClick={openMenu} className="header__menu-button" />}
            <BurgerMenu
                isVisible={false}
                onClose={closeMenu}
                isMenuOpen={isMenuOpen}
            />
        </header>
    );
}

export default Header;