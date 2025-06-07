import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlashcardsByCategory } from '../api/flashcardApi';
import Flashcard from '../components/Flashcard';
import Container from '../components/ui/Container';
import { Category } from '../types';

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

  if (cardsForCategory.length === 0) {
    return (
      <Container>
        <h1>No Cards</h1>
        <p>No cards were found for the category: {category}</p>
      </Container>
    );
  }

  const currentCard = cardsForCategory[currentCardIndex];
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Container>
      <h1>Studying: {capitalizedCategory}</h1>
      <Flashcard card={currentCard} />
      {/* Navigation buttons will go here later */}
    </Container>
  );
}

export default FlashcardPage; 