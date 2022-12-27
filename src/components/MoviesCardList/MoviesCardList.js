import React from "react";
import "./MoviesCardList.css"
import MovieCard from "../MovieCard/MovieCard";

const MoviesCardList = ({ isSavedMovies, moviesList, handleDeleteMovie, handleAddMovie  }) => {

    
    return (
        <>        
        <ul className="movies-list">
            {
                moviesList.map((card) => (
                    <MovieCard
                        _id={card._id}
                        key={card.movieId}
                        isSavedMovies={isSavedMovies}
                        movieId={card.movieId}
                        title={card.nameRU}
                        duration={card.duration}
                        image={card.image}
                        isLiked={isSavedMovies ? true : card.isLiked}
                        handleDeleteMovie={handleDeleteMovie}
                        trailerLink={card.trailerLink}
                    />
                ))
                }
        </ul>
        {!isSavedMovies && <button className="movies-list__more-button">Еще</button>}
        {isSavedMovies && <div className="movie-list__spacer"></div>}        
        </>
    );
};

export default MoviesCardList;