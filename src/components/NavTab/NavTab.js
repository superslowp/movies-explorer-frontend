import React from "react";
import './NavTab.css';

const NavTab = () => {
    return (
        <ul className="navtab">
            <li className="navtab__link-item">
                <a className="navtab__navlink" href="#AboutProject">
                    О проекте
                </a>
            </li>
            <li className="navtab__link-item">
                <a className="navtab__navlink" href="#Techs">
                    Технологии
                </a>
            </li>
            <li className="navtab__link-item">
                <a className="navtab__navlink" href="#AboutMe">
                    Студент
                </a>
            </li>
        </ul>
    );
};

export default NavTab;