import React from "react";
import "./MovieCard.css";
import { MOVIES_IMAGE_URL } from "../../utils/constants";

const MovieCard = ({ _id, movieId, isSavedMovies, title, duration, trailerLink, image, isLiked, handleDeleteMovie, handleAddMovie }) => {

    const imageURL = isSavedMovies ? image : MOVIES_IMAGE_URL+image;

    const handleLike = () => {
        if (isLiked) {
            handleDeleteMovie(_id);
        } else {
            handleAddMovie(movieId);
        }
    }

    const handleDelete = () => {
        handleDeleteMovie(_id);
    }

    return (
        <li className="movie-card" id={movieId}>
            <div className="movie-card__info">
                <div className="movie-card__title-wrapper">
                    <h2 className="movie-card__title">{title}</h2>
                    <p className="movie-card__duration">{duration}</p>
                </div>
                {!isSavedMovies && <button
                    className={`movie-card__button ${isLiked ? "movie-card__button_type_like-active" : "movie-card__button_type_like"}`}
                    onClick={handleLike}
                />}
                {isSavedMovies && <button
                    className="movie-card__button movie-card__button_type_remove"
                    onClick={handleDelete}
                />}
            </div>
            <a
                href={trailerLink}
                target='_blank'
                rel='noreferrer'
            >
                <img className="movie-card__image" src={imageURL} alt={title} />
            </a>
        </li>
    )
};

export default MovieCard;