import React from "react";
import "./MoviesCardList.css"
import MovieCard from "../MovieCard/MovieCard";
import { Cards, SavedCards } from "../../utils/Cards";

const MoviesCardList = ({ isSavedMovies }) => {

    const arr = isSavedMovies ? SavedCards : Cards;
    const [isMore, setIsMore] = React.useState(true);

    return (
        <>        
        <ul className="movies-list">
            {
                arr.map((card) => (
                    <MovieCard
                        key={card.movieId}
                        isSavedMovies={isSavedMovies}
                        movieId={card.movieId}
                        title={card.title}
                        duration={card.duration}
                        image={card.image}
                        isLiked={card.isLiked}
                    />
                ))
            }
        </ul>
        {!isSavedMovies && isMore && <button className="movies-list__more-button">Еще</button>}
        {isSavedMovies && <div className="movie-list__spacer"></div>}        
        </>
    );
};

export default MoviesCardList;