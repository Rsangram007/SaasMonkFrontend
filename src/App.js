import './CSS/App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css';
import HomePage from './Pages/HomePage';
import Navbar from './Pages/Navbar';
import MovieDetails from './Pages/MovieDetails';
import AddMovie from './Pages/AddMovie';
import AddReview from './Pages/AddReview';
import EditReview from './Pages/EditReview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <div>
    <Router>
    <Navbar />
      <Routes>
        <Route  path="/" element={<HomePage />}/>
        <Route  path="/detail/:id" element={<MovieDetails />}/>
        <Route path="/edit-review/:reviewId" element={<EditReview />} />
        <Route path='addMovie' element={<AddMovie/>}/>
        <Route path='addReview' element={<AddReview/>}/>
      </Routes>
    </Router>
    </div>
    <ToastContainer/>
    </>
  );
}

export default App;
