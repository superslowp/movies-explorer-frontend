import React from "react";
import "./SearchBar.css"

const SearchBar = ({ handleSearch, onShortsChange, restoreValues }) => {

    const [searchParam, setSearchParam] = React.useState('');
    const [shortFilter, setShortFilter] = React.useState(false);

    const onSearchChange = (e) => {
        setSearchParam(e.target.value);
    }

    const onShortFilterChange = (e) => {
        setShortFilter(!shortFilter);
        onShortsChange(searchParam, !shortFilter);
    }

    const submitSearch = (e) => {
        e.preventDefault();
        handleSearch(searchParam, shortFilter);
    }

    React.useEffect(() => {
        if (restoreValues) {
            const shortFilter = JSON.parse(localStorage.getItem('shortFilter'))
            const searchParam = localStorage.getItem('searchParam')
            if (shortFilter) {
                setShortFilter(shortFilter)
            }
            if (searchParam) {
                setSearchParam(searchParam)
            }
        }
    }, []);

    return (
        <form
            className="searchbar"
            onSubmit={submitSearch}
        >
            <fieldset className="searchbar__wrapper">
                <input
                    name="movie"
                    type="text"
                    className='searchbar__input'
                    placeholder="Фильм"
                    onChange={onSearchChange}
                    value={searchParam || ''}
                />
                <button
                    className="searchbar__button"
                    type="submit"
                />
            </fieldset>
            <div className="searchbar__line" />
            <div className="searchbar__checkbox-wrapper">
                <input
                    className="searchbar__checkbox"
                    type='checkbox'
                    name="shortFilm"
                    onChange={onShortFilterChange}
                    checked={shortFilter}
                />
                <span className="searchbar__checkbox-label">Короткометражки</span>
            </div>
        </form>
    );
};

export default SearchBar;