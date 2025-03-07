import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className='Home'>
      <div className='Home-banner'>
        <h1>Steimatzky Book Store</h1>
        <p>Browse our extensive collection of books across various genres. Discover new titles, explore different categories, and manage our book inventory all in one place.</p>
      </div>

      <div className='Home-features'>
        <div className='Home-feature'>
          <div className='Home-feature-icon'>📚</div>
          <h3>Book Collection</h3>
          <p>Browse our comprehensive catalog of books organized by genre.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>➕</div>
          <h3>Add Books</h3>
          <p>Easily add new books to our inventory with detailed information.</p>
        </div>

        <div className='Home-feature'>
          <div className='Home-feature-icon'>🔍</div>
          <h3>Genre Filtering</h3>
          <p>Filter books by genre to quickly find what you're looking for.</p>
        </div>
      </div>

      <div className='Home-cta'>
        <Link to="/books/list">Browse Books</Link>
        <Link to="/books/add" className="secondary-btn">Add New Book</Link>
      </div>
    </div>
  );
}