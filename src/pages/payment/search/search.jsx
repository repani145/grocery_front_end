import React, { useState } from 'react';
import './search.css'; // Custom CSS file
import { data } from "../../../Images/data";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="Search for restaurants and food" 
                className="search-input" 
            />
            <img 
                src={data.search_icon}
                alt="Search Icon" 
                className="search-icon" 
            />
        </div>
    );
};

export default SearchBar;
