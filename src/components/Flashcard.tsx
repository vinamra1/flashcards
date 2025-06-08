import { useState, MouseEvent } from 'react';
import { Flashcard as FlashcardType } from '../types';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  card: FlashcardType;
  onCorrect: () => void;
  onWrong: () => void;
}

function Flashcard({ card, onCorrect, onWrong }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleFeedback = (e: MouseEvent, callback: () => void) => {
    e.stopPropagation(); // Prevent the card from flipping back
    callback();
    setIsFlipped(false); // Reset for the next card
  };

  return (
    <div className={styles.flashcardContainer}>
      <div className={styles.flashcard} onClick={handleFlip} data-testid="flashcard">
        <div className={`${styles.cardInner} ${isFlipped ? styles.isFlipped : ''}`}>
          <div className={styles.cardFront}>
            <h2>{card.spanish}</h2>
          </div>
          <div className={styles.cardBack}>
            <h2>{card.english}</h2>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className={styles.feedbackButtons}>
          <button
            className={`${styles.feedbackButton} ${styles.correctButton}`}
            onClick={(e) => handleFeedback(e, onCorrect)}
            data-testid="correct-button"
          >
            ✅ I got it right
          </button>
          <button
            className={`${styles.feedbackButton} ${styles.wrongButton}`}
            onClick={(e) => handleFeedback(e, onWrong)}
            data-testid="wrong-button"
          >
            ❌ I got it wrong
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcard; 