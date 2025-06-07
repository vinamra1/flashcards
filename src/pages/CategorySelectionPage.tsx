import { Link, useLocation } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import styles from './CategorySelectionPage.module.css';

const categories = [...new Set(flashcards.map(card => card.category))];

function CategorySelectionPage() {
  const location = useLocation();
  const mode = location.pathname.startsWith('/study') ? 'study' : 'quiz';

  return (
    <div className={styles.container}>
      <h1>Select a Category for {mode === 'study' ? 'Study' : 'Quiz'}</h1>
      <div className={styles.categoryContainer}>
        {categories.map(category => (
          <Link key={category} to={`/${mode}/${category}`} className={styles.categoryLink}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySelectionPage; 