import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudySession } from '../context/StudySessionContext';
import Flashcard from '../components/Flashcard';
import Container from '../components/ui/Container';

function RedoPage() {
  const { wrongAnswers, removeWrongAnswer } = useStudySession();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (wrongAnswers.length === 0) {
    return (
      <Container>
        <h1>No Wrong Cards!</h1>
        <p>You have no cards to redo. Great job!</p>
        <Link to="/" className="button-link">Go Home</Link>
      </Container>
    );
  }

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const handleCorrect = () => {
    // Remove the card from the global list of wrong answers
    removeWrongAnswer(wrongAnswers[currentCardIndex]);
    handleNextCard();
  };

  const handleWrong = () => {
    // It stays in the wrongAnswers list, just move to the next card
    handleNextCard();
  };

  if (currentCardIndex >= wrongAnswers.length) {
    const remainingWrong = wrongAnswers.filter(card => 
        // This logic is a bit tricky. We need to see what's *still* in wrongAnswers
        // after this session's removals.
        // A simpler approach is to check the length *after* the session.
        // Let's check the length of wrongAnswers at the end.
        true
    );

    return (
      <Container>
        <h1>Redo Session Complete!</h1>
        <p>
          You reviewed all your wrong cards.
        </p>
        <Link to="/study" className="button-link">Study More</Link>
        {wrongAnswers.length > 0 && (
             <Link to="/study/redo" className="button-link-secondary">Redo Again ({wrongAnswers.length} left)</Link>
        )}
      </Container>
    );
  }

  const currentCard = wrongAnswers[currentCardIndex];

  return (
    <Container>
      <h1>Redoing Wrong Cards</h1>
      <p>
        Card {currentCardIndex + 1} of {wrongAnswers.length}
      </p>
      <Flashcard card={currentCard} onCorrect={handleCorrect} onWrong={handleWrong} />
    </Container>
  );
}

export default RedoPage; 