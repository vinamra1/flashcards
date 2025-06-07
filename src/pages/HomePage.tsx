import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Spanish Flashcards</h1>
      <p>Welcome! Choose an option below to get started.</p>
      <div className={styles.buttonContainer}>
        <Link to="/study" className={`${styles.button} ${styles.studyButton}`}>
          Study Mode
        </Link>
        <Link to="/quiz" className={`${styles.button} ${styles.quizButton}`}>
          Quiz Mode
        </Link>
        <Link to="/stats" className={`${styles.button} ${styles.statsButton}`}>
          Stats Page
        </Link>
      </div>
    </div>
  );
}

export default HomePage; 