import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="navbarLogo"
       onClick={() => navigate('/')}>
        MOVIECRITICS
      </div>
      <ul className="navbar_links">
        <li>
          <Link to="/addMovie" className="nav-link">Add New Movie</Link>
        </li>
        <li>
          <Link to="/addReview" className="nav-link">Add New Review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
