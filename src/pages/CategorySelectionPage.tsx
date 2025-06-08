import { Link } from 'react-router-dom';
import { getCategories } from '../api/flashcardApi';
import Container from '../components/ui/Container';
import { useStudySession } from '../context/StudySessionContext';
import styles from './CategorySelectionPage.module.css';

interface CategorySelectionPageProps {
  mode?: 'study' | 'quiz';
}

function CategorySelectionPage({ mode = 'study' }: CategorySelectionPageProps) {
  const categories = getCategories();
  const { wrongAnswers, clearWrongAnswers } = useStudySession();

  const pageTitle = mode === 'study' ? 'Study Session' : 'Quiz Session';

  return (
    <Container>
      <h1>{pageTitle}: Choose a Category</h1>
      <ul className={styles.categoryList}>
        {categories.map((category) => {
          const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
          return (
            <li key={category} className={styles.categoryItem}>
              <h3>{capitalizedCategory}</h3>
              {mode === 'study' ? (
                <Link to={`/study/${category}`} className="button-link">
                  Study: {capitalizedCategory}
                </Link>
              ) : (
                <div className={styles.quizOptions}>
                  <Link to={`/quiz/${category}/multiple-choice`} className="button-link">
                    Multiple Choice
                  </Link>
                  <Link to={`/quiz/${category}/fill-in-the-blank`} className="button-link-secondary">
                    Fill in the Blank
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {mode === 'study' && wrongAnswers.length > 0 && (
        <div className="redo-section">
          <p>You have {wrongAnswers.length} card(s) to review.</p>
          <div className={styles.redoButtons}>
            <Link to="/study/redo" className="button-link-secondary">Redo Wrong Cards</Link>
            <button onClick={clearWrongAnswers} className="button-link-danger">Clear Wrong Cards</button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CategorySelectionPage; 