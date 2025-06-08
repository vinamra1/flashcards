import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFlashcardsByCategory } from '../api/flashcardApi';
import Flashcard from '../components/Flashcard';
import Container from '../components/ui/Container';
import { Category, Flashcard as FlashcardType } from '../types';

function FlashcardPage() {
  const { category } = useParams<{ category: Category }>();

  // A simple type guard to ensure the category from the URL is valid
  const isValidCategory = (cat: string | undefined): cat is Category => {
    return !!cat && ['animals', 'food', 'verbs'].includes(cat);
  };

  if (!isValidCategory(category)) {
    return (
      <Container>
        <h1>Category not found</h1>
        <p>The category "{category}" does not exist.</p>
      </Container>
    );
  }

  const cardsForCategory = getFlashcardsByCategory(category);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<FlashcardType[]>([]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const handleCorrect = () => {
    handleNextCard();
  };

  const handleWrong = () => {
    setWrongAnswers((prev) => [...prev, cardsForCategory[currentCardIndex]]);
    handleNextCard();
  };

  if (cardsForCategory.length === 0) {
    return (
      <Container>
        <h1>No Cards</h1>
        <p>No cards were found for the category: {category}</p>
      </Container>
    );
  }

  // End of session
  if (currentCardIndex >= cardsForCategory.length) {
    return (
      <Container>
        <h1>Session Complete!</h1>
        <p>
          You got {cardsForCategory.length - wrongAnswers.length} right and {wrongAnswers.length} wrong.
        </p>
        <Link to="/study">Back to Categories</Link>
        {/* Later, a "Redo wrong answers" button will go here */}
      </Container>
    );
  }

  const currentCard = cardsForCategory[currentCardIndex];
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Container>
      <h1>Studying: {capitalizedCategory}</h1>
      <p>
        Card {currentCardIndex + 1} of {cardsForCategory.length}
      </p>
      <Flashcard card={currentCard} onCorrect={handleCorrect} onWrong={handleWrong} />
    </Container>
  );
}

export default FlashcardPage; 