import React from "react";
import './AboutMe.css';
import portfolioPhoto from '../../images/portfolio-photo.jpg';

const AboutMe = () => {
    return (
        <section className="about-me" id="AboutMe">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__wrapper">
                <div className="about-me__bio">
                    <h3 className="about-me__name">Павел</h3>
                    <h4 className="about-me__subtitle">Разработчик, 36 лет</h4>
                    <p className="about-me__text">Я родился и живу в Иркутске. Имею IT-образование по специальности "Прикладная информатика в экономике". У меня есть жена, дети и кошка. Занимаюсь йогой, фотографирую, радуюсь жизни. Являюсь сертифицированным 1с-разработчиком на протяжении уже более 10 лет. Работаю на фрилансе, постоянно учусь и расширяю свои компетенции.</p>
                    <a className="about-me__github-link" href="https://github.com/superslowp" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={portfolioPhoto} alt="фотография" />
            </div>
        </section>
    );
};

export default AboutMe;