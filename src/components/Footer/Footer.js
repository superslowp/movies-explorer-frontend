import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум x BeatFilm.</p>
            <div className="footer__wrapper">
                <p className="footer__year footer__text">&copy; 2022</p>
                <div className="footer__links-wrapper">
                    <a className="footer__link footer__text" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link footer__text" href="https://github.com/superslowp" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;