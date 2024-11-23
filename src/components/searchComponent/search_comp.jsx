import React, { useContext, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth/userAuth';
import { Link, useNavigate } from 'react-router-dom';
import { searchItemsContext } from '../../contexts/searchProductsContext/searchPros';
import { baseUrl } from '../../urls/urls';
// const baseUrl = 'http://127.0.0.1:5000';

const NavSearch = () => {
    const {accessToken} = useAuth()
    const {setSingleItem,setSimilarItems} = useContext(searchItemsContext)
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate()

    // Debounced function to fetch search suggestions
    const debouncedSearch = _.debounce(async (searchText) => {
        try {
            const response = await axios.get(`${baseUrl}/search?query=${searchText}`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSuggestions(response.data);  // Update suggestions with API response
        } catch (error) {
            console.error("Error fetching search suggestions:", error);
        }
    }, 300); // Debounce by 300ms

    const handleInputChange = (event) => {
        const searchText = event.target.value;
        setQuery(searchText);
        if (searchText.trim().length >= 2) {
            debouncedSearch(searchText);
        } else {
            setSuggestions([]);  // Clear suggestions if query is too short
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search submitted for:", query);
    };

    const handleItem = (item)=>{
        setQuery(item.name)
        setSingleItem(item)
        setSimilarItems(suggestions.filter((i)=>i!=item))
        setSuggestions([])
        navigate(`/product/${query}`)
        localStorage.setItem('categry',query)
        localStorage.setItem('pro_id',item['id'])
    }

    return (
        <Nav className="mx-auto" style={{ position: 'relative' }}>
            <Form className="d-flex" onSubmit={handleSearchSubmit} style={{ width: '300px' }}>
                <FormControl
                    type="search"
                    placeholder="Search products..."
                    className="me-2"
                    aria-label="Search"
                    style={{ backgroundColor: '#c8d0d3', borderColor: '#75756f', color: '#1f1e1d' }}
                    value={query}
                    onChange={handleInputChange}
                />
                <Button 
                    type="submit"
                    style={{ backgroundColor: '#e5ac08', borderColor: '#e5ac08', color: '#1f1e1d' }}
                >
                    Search
                </Button>
            </Form>
            
            {suggestions.length > 0 && (
                <Dropdown.Menu 
                    show 
                    className="w-100"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',  // Same width as the search bar
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd'
                    }}
                >
                    {suggestions.map((item) => (
                        <Dropdown.Item key={item.id} onClick={()=>handleItem(item)}>
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )}
        </Nav>
    );
};

export default NavSearch;
