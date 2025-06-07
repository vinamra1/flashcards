import { useParams } from 'react-router-dom';
import styles from './FlashcardPage.module.css'; // Re-using styles for now

function QuizPage() {
  const { category } = useParams<{ category: string }>();
  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className={styles.container}>
      <h1>Quiz: {capitalizedCategory}</h1>
      <p>The quiz interface will be built here.</p>
    </div>
  );
}

export default QuizPage; 