import React from "react";
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className="about-project" id="AboutProject">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__steps">
                <div className="about-project__steps-column">
                    <h3 className="about-project__steps-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__steps-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__steps-column">
                    <h3 className="about-project__steps-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__steps-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__progressbar-wrapper">
                <div className="about-project__progressbar-column about-project__progressbar-column_type_backend">
                    <p className="about-project__progressbar about-project__progressbar_type_backend">1 неделя</p>
                    <p className="about-project__progressbar-title">Back-end</p>
                </div>
                <div className="about-project__progressbar-column">
                    <p className="about-project__progressbar">4 недели</p>
                    <p className="about-project__progressbar-title">Front-end</p>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;