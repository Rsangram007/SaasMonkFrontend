// EditReview.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditReview() {
    const { reviewId } = useParams();
    const [review, setReview] = useState({ reviewComments: '', rating: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing review data
        axios.get(`https://saa-s-monk-xi.vercel.app/reviews/${reviewId}`)
            .then(response => {
                setReview(response.data);
            })
            .catch(error => {
                console.error("Error fetching review:", error);
            });
    }, [reviewId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update review on the server
        axios.put(`https://saa-s-monk-xi.vercel.app/reviews/${reviewId}`, review)
            .then(() => {
                navigate(`/`); // Redirect back to the movie details page
            })
            .catch(error => {
                console.error("Error updating review:", error);
            });
    };

    return (
        <div>
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Review Comments:</label>
                    <textarea
                        name="reviewComments"
                        value={review.reviewComments}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                        required
                        min="0"
                        max="10"
                    />
                </div>
                <button type="submit">Update Review</button>
            </form>
        </div>
    );
}

export default EditReview;
