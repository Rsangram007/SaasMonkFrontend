import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://saa-s-monk-xi.vercel.app/movies/${id}`)
            .then((response) => {
                console.log("=====", response.data);
                setMovie(response.data);
            })
            .catch(error => {
                console.error("Error fetching movie details:", error);
            });
    }, [id]);

    const handleEditReview = (reviewId) => {
        navigate(`/edit-review/${reviewId}`); // Navigate to edit review page
    };

    return (
        <div className="movie-details">
            {movie ? (
                <div className="movie-info">
                    <div className="movie-header">
                        <h2 className="movie-title">{movie.movieName}</h2>
                        <p className="avg-rating">
                            Average Rating: 
                            <span className="rating">{movie.avgRating}/10</span>
                        </p>
                    </div>
                </div>
            ) : (
                <p>Loading movie details...</p>
            )}

            <div className="reviews-container">
                <h3 className="reviews-heading">Reviews</h3>
                {movie?.reviews && movie.reviews.length > 0 ? (
                    movie.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <div className="review-header">
                                <button onClick={() => handleEditReview(review._id)} className="edit-button">
                                    <i className="fas fa-edit"></i> {/* Edit icon */}
                                </button>
                            </div>
                            <p className="review-comments">{review.reviewComments}</p>
                            <p className="reviewer-name">By: {review.reviewerName}</p>
                            <p className="review-rating">
                                Rating: <span className="rating">{review.rating}/10</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
}

export default MovieDetails;

