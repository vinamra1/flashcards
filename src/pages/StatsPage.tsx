import { useStats, CategoryStats } from '../context/StatsContext';
import { Category } from '../types';
import Container from '../components/ui/Container';
import styles from './StatsPage.module.css';

function StatsPage() {
  const { stats, resetStats } = useStats();

  const totalStudied = Object.values(stats).reduce((acc, val) => acc + val.studied, 0);
  const totalCorrect = Object.values(stats).reduce((acc, val) => acc + val.correct, 0);
  const totalIncorrect = Object.values(stats).reduce((acc, val) => acc + val.incorrect, 0);
  const totalAccuracy = totalCorrect + totalIncorrect > 0 ? (totalCorrect / (totalCorrect + totalIncorrect)) * 100 : 0;

  const getCategoryAccuracy = (catStats: CategoryStats) => {
    const { correct, incorrect } = catStats;
    if (correct + incorrect === 0) return 0;
    return (correct / (correct + incorrect)) * 100;
  };

  return (
    <Container>
      <h1>Statistics</h1>
      
      <div className={styles.statsContainer}>
        <div className={styles.overallStats}>
          <h2>Overall Performance</h2>
          <p>Total Cards Studied: <strong>{totalStudied}</strong></p>
          <p>Total Correct Answers: <strong className={styles.correct}>{totalCorrect}</strong></p>
          <p>Total Incorrect Answers: <strong className={styles.incorrect}>{totalIncorrect}</strong></p>
          <p>Overall Accuracy: <strong>{totalAccuracy.toFixed(1)}%</strong></p>
        </div>

        <div className={styles.categoryBreakdown}>
          <h2>By Category</h2>
          {Object.entries(stats).map(([category, catStats]) => (
            <div key={category} className={styles.categoryCard}>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <p>Studied: <strong>{catStats.studied}</strong></p>
              <p>Correct: <strong className={styles.correct}>{catStats.correct}</strong></p>
              <p>Incorrect: <strong className={styles.incorrect}>{catStats.incorrect}</strong></p>
              <p>Accuracy: <strong>{getCategoryAccuracy(catStats).toFixed(1)}%</strong></p>
            </div>
          ))}
        </div>

        <div className={styles.resetSection}>
            <button onClick={resetStats} className="button-link-danger">
                Reset All Statistics
            </button>
        </div>
      </div>
    </Container>
  );
}

export default StatsPage; 