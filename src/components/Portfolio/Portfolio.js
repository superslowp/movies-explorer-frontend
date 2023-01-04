import React from "react";
import './Portfolio.css';
import arrow from '../../images/portfolio-arrow.svg';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfilio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/superslowp/how-to-learn" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <img className="portfolio__arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/superslowp/russian-travel" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <img className="portfolio__arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/superslowp/react-mesto-api-full" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <img className="portfolio__arrow" src={arrow} alt="стрелка"/>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;