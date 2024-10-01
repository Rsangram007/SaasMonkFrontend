import axios from 'axios';
import '../CSS/AddReview.css'
import React, { useEffect, useState } from 'react';
import {toast} from "react-toastify" 

function AddReview() {
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewComments, setReviewComments] = useState('');

    useEffect(() => {
        axios.get('https://saa-s-monk-xi.vercel.app/movies')
            .then((response) => {
                console.log(response.data);
                setMovieList(response.data);
            })
            .catch(error => {
                console.error("Error fetching movie list:", error);
            });
    }, []);

    const submitForm = async () => {
        try {
            const response = await axios.post('https://saa-s-monk-xi.vercel.app/reviews', {
                movieName: selectedMovie,
                reviewerName: reviewerName,
                rating: rating,
                reviewComments: reviewComments
            });
            toast.success("Your Review has been submitted!");
            if (response.data.error) {
                throw new Error(response.data.error);
            } else {
                console.log(response.data);
            }
            const movieData = await axios.get('https://saa-s-monk-xi.vercel.app/movies');
            console.log(movieData);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("An error occurred while submitting your review. Please try again later.");
        }
    };
    

    return (
        <div className="add-review-container">
            <h2>Add Review</h2>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="movieSelect">
                        Select Movie:</label>
                    <select id="movieSelect"
                     value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
                        <option value="">Select a movie</option>
                        {movieList.map(movie => (
                            <option key={movie.id} value={movie.movieName}>{movie.movieName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="reviewerName">
                        Reviewer Name:</label>
                    <input type="text"
                    id="reviewerName" value={reviewerName}
                    required 
                    onChange={(e) => setReviewerName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1-10):</label>
                    <input type="number"
                    id="rating" value={rating}
                    min="1" max="10"
                    required
                    onChange={(e) => setRating(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="reviewComments">Review Comments:</label>
                    <textarea id="reviewComments"
                    value={reviewComments}
                    required
                    onChange={(e) => setReviewComments(e.target.value)} />
                </div>
                <button type="submit" className="btn-submit">Submit Review</button>
            </form>
        </div>
    );
}

export default AddReview;
