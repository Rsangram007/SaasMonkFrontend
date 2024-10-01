import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../CSS/HomePage.css';
import { useNavigate, useParams } from 'react-router-dom';



function HomePage() {
    let { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://saa-s-monk-xi.vercel.app/movies')
            .then((response) => {
                console.log("movies deatils",response.data);
                setMovies(response.data);
            });
    }, [id])

    // Function to format date string into dd-mm-yyyy format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }


    // Filter movies based on search query
    const filteredMovies = movies.filter(movie => movie.movieName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className='movieList_Container'>
            <h1 className='heading'>Best Site for Movie Reviews</h1>
            <div className="search-container">
            <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className='search-input'
                  placeholder="Search movies by name..."
                  value={searchQuery}
                  onChange={(event)=>{setSearchQuery(event.target.value)}}
                />
            </div>
            <div className="movies-container">
                {filteredMovies.map((movie, key) => (
                    <div key={key} className="movie-card"
                        onClick={() => { navigate(`/detail/${movie._id}`) }}>
                        <h2 className="movie-title">
                            {movie.movieName}
                        </h2>
                        <p className="release-date">
                            <strong>Release Date : </strong>
                            {formatDate(movie.releaseDate)}
                        </p>
                        <p className="rating">
                            <strong>Rating : </strong>
                            {movie.avgRating}/10
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;
