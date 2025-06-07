import { useState } from 'react';
import { Flashcard as FlashcardType } from '../data/flashcards';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  card: FlashcardType;
}

function Flashcard({ card }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.flashcard} onClick={handleFlip}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.isFlipped : ''}`}>
        <div className={styles.cardFront}>
          <h2>{card.spanish}</h2>
        </div>
        <div className={styles.cardBack}>
          <h2>{card.english}</h2>
        </div>
      </div>
    </div>
  );
}

export default Flashcard; 