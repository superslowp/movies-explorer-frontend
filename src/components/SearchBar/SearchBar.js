import React from "react";
import "./SearchBar.css"

const SearchBar = () => {
    return (
        <section className="searchbar">
            <fieldset className="searchbar__wrapper">
                <input className='searchbar__input' placeholder="Фильм" />
                <button className="searchbar__button" />
            </fieldset>
            <div className="searchbar__line" />
            <div className="searchbar__checkbox-wrapper">
                <input className="searchbar__checkbox" type='checkbox' />
                <span className="searchbar__checkbox-label">Короткометражки</span>
            </div>
        </section>
    );
};

export default SearchBar;