import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';
import styles from './FlashcardPage.module.css';

function FlashcardPage() {
  const { category } = useParams<{ category: string }>();
  const cardsForCategory = flashcards.filter(card => card.category === category);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (cardsForCategory.length === 0) {
    return (
      <div className={styles.container}>
        <h1>Category not found</h1>
        <p>No cards found for category: {category}</p>
      </div>
    );
  }

  const currentCard = cardsForCategory[currentCardIndex];

  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className={styles.container}>
      <h1>Studying: {capitalizedCategory}</h1>
      <Flashcard card={currentCard} />
      {/* Navigation buttons will go here later */}
    </div>
  );
}

export default FlashcardPage; 