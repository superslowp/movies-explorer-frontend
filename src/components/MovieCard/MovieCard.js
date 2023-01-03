import React from "react";
import "./MovieCard.css";
import { MOVIES_IMAGE_URL } from "../../utils/constants";

const MovieCard = ({ card, isSavedMovies, handleDeleteMovie, handleAddMovie }) => {

    const [cardIsLiked, setCardIsLiked] = React.useState(card.isLiked);
    const [cardId, setCardId] = React.useState(card._id);

    const imageURL = isSavedMovies ? card.image : MOVIES_IMAGE_URL + card.image.url;

    const durationFormatted = `${Math.floor(card.duration / 60)}ч ${Math.floor(card.duration % 60)}м`;

    const handleLike = async () => {
        if (card.isLiked) {
            try {
                if (await handleDeleteMovie(cardId)) {
                    setCardIsLiked(!cardIsLiked);
                }
            } catch (err) {
            }
        } else {
            try {
                const newCard = await handleAddMovie(card);
                setCardIsLiked(!cardIsLiked);
                setCardId(newCard._id);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDelete = () => {
        handleDeleteMovie(cardId);
    }

    return (
        <li className="movie-card" id={card.movieId}>
            <div className="movie-card__info">
                <div className="movie-card__title-wrapper">
                    <h2 className="movie-card__title">{card.nameRU}</h2>
                    <p className="movie-card__duration">{durationFormatted}</p>
                </div>
                {!isSavedMovies && <button
                    className={`movie-card__button ${cardIsLiked ? "movie-card__button_type_like-active" : "movie-card__button_type_like"}`}
                    onClick={handleLike}
                />}
                {isSavedMovies && <button
                    className="movie-card__button movie-card__button_type_remove"
                    onClick={handleDelete}
                />}
            </div>
            <a
                href={card.trailerLink}
                target='_blank'
                rel='noreferrer'
            >
                <img className="movie-card__image" src={imageURL} alt={card.nameRU} />
            </a>
        </li>
    )
};

export default MovieCard;