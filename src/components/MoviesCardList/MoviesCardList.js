import React from "react";
import "./MoviesCardList.css"
import MovieCard from "../MovieCard/MovieCard";

const MoviesCardList = ({ isSavedMovies,
    moviesList,
    handleDeleteMovie,
    handleAddMovie,
    nothingIsFound,
    showMore,
    handleGetMoreMovies,
    errorText }) => {

    return (
        <>
            <ul className="movies-list">
                {moviesList.length === 0 && nothingIsFound
                    ? <p className="morives-list__no-results">{errorText}</p>
                    : moviesList.map((card) => (
                        <MovieCard
                            _id={card._id}
                            key={isSavedMovies ? card._id : card.id}
                            card={card}
                            isSavedMovies={isSavedMovies}
                            movieId={card.movieId}
                            title={card.nameRU}
                            duration={card.duration}
                            image={card.image}
                            isLiked={isSavedMovies ? true : card.isLiked}
                            trailerLink={card.trailerLink}
                            country={card.country}
                            handleDeleteMovie={handleDeleteMovie}
                            handleAddMovie={handleAddMovie}
                        />
                    ))

                }
            </ul>
            {!isSavedMovies
                && showMore
                && <button className="movies-list__more-button" onClick={handleGetMoreMovies}>Еще</button>}
            {isSavedMovies && <div className="movie-list__spacer"></div>}
        </>
    );
};

export default MoviesCardList;