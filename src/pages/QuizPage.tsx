import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFlashcardsByCategory } from '../api/flashcardApi';
import Container from '../components/ui/Container';
import { Category, QuizType } from '../types';
import styles from './QuizPage.module.css';
import { useStats } from '../context/StatsContext';

function QuizPage() {
  const { category, quizType } = useParams<{ category: Category; quizType: QuizType }>();
  const { trackQuiz } = useStats();
  
  const isValidCategory = (cat: string | undefined): cat is Category => !!cat && ['animals', 'food', 'verbs'].includes(cat);
  const isValidQuizType = (type: string | undefined): type is QuizType => !!type && ['multiple-choice', 'fill-in-the-blank'].includes(type);

  if (!isValidCategory(category) || !isValidQuizType(quizType)) {
    return (
      <Container>
        <h1>Invalid Quiz Parameters</h1>
        <p>The category or quiz type is not valid.</p>
        <Link to="/quiz" className="button-link">Back to Quiz Selection</Link>
      </Container>
    );
  }

  const allCards = getFlashcardsByCategory(category);
  const quizCards = allCards.filter(card => card.quiz.type === quizType);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const currentCard = quizCards[currentCardIndex];

  const handleAnswerSubmit = () => {
    if (feedback) return; // Don't allow re-submission

    const isCorrect = userAnswer.toLowerCase() === currentCard.english.toLowerCase();
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
      trackQuiz(category, 'correct');
    } else {
      setFeedback('incorrect');
      trackQuiz(category, 'incorrect');
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer('');
    setCurrentCardIndex(i => i + 1);
  };

  if (quizCards.length === 0) {
    return (
        <Container>
            <h1>No Quiz Questions</h1>
            <p>No "{quizType}" questions were found for the category: {category}</p>
        </Container>
    );
  }

  if (currentCardIndex >= quizCards.length) {
    return (
      <Container>
        <h1>Quiz Complete!</h1>
        <p>You scored {score} out of {quizCards.length}.</p>
        <Link to="/quiz" className="button-link">Take Another Quiz</Link>
      </Container>
    );
  }

  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const formattedQuizType = quizType.replace('-', ' ');

  return (
    <Container>
      <h1>Quiz: {capitalizedCategory}</h1>
      <p className={styles.quizSubtitle}>{formattedQuizType}</p>
      <p>Question {currentCardIndex + 1} of {quizCards.length}</p>

      <div className={styles.questionContainer}>
        <p className={styles.spanishWord}>{currentCard.spanish}</p>
        
        {quizType === 'multiple-choice' && currentCard.quiz.type === 'multiple-choice' && (
          <div className={styles.optionsGrid}>
            {currentCard.quiz.options.map((option: string) => (
              <button 
                key={option}
                className={`${styles.optionButton} ${userAnswer === option ? styles.selected : ''}`}
                onClick={() => setUserAnswer(option)}
                disabled={!!feedback}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {quizType === 'fill-in-the-blank' && (
          <input
            type="text"
            className={styles.textInput}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={!!feedback}
            placeholder="Type the English translation"
          />
        )}

        <button onClick={handleAnswerSubmit} disabled={!userAnswer || !!feedback} className="button-link">
            Submit
        </button>

        {feedback === 'correct' && (
            <div className={styles.feedbackCorrect}>Correct!</div>
        )}
        {feedback === 'incorrect' && (
            <div className={styles.feedbackIncorrect}>
                Wrong! The correct answer was: <strong>{currentCard.english}</strong>
            </div>
        )}

        {feedback && (
            <button onClick={handleNextQuestion} className="button-link-secondary">
                Next Question
            </button>
        )}
      </div>
    </Container>
  );
}

export default QuizPage; 