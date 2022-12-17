import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movieId, isSavedMovies, title, duration, image, isLiked, onButtonClick }) => {
    return (
        <li className="movie-card" id={movieId}>
            <div className="movie-card__info">
                <div className="movie-card__title-wrapper">
                    <h2 className="movie-card__title">{title}</h2>
                    <p className="movie-card__duration">{duration}</p>
                </div>
                {!isSavedMovies && <button
                    className={`movie-card__button ${isLiked ? "movie-card__button_type_like-active" : "movie-card__button_type_like"}`}
                    onClick={onButtonClick}
                />}
                {isSavedMovies && <button
                    className="movie-card__button movie-card__button_type_remove"
                    onClick={onButtonClick}
                />}
            </div>
            <img className="movie-card__image" src={image} alt={title} />
        </li>
    )
};

export default MovieCard;