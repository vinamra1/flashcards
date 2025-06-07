import { Link, useLocation } from 'react-router-dom';
import { getCategories } from '../api/flashcardApi';
import styles from './CategorySelectionPage.module.css';
import Container from '../components/ui/Container';

const categories = getCategories();

function CategorySelectionPage() {
  const location = useLocation();
  const mode = location.pathname.startsWith('/study') ? 'study' : 'quiz';

  return (
    <Container>
      <h1>Select a Category for {mode === 'study' ? 'Study' : 'Quiz'}</h1>
      <div className={styles.categoryContainer}>
        {categories.map(category => (
          <Link key={category} to={`/${mode}/${category}`} className={styles.categoryLink}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default CategorySelectionPage; 