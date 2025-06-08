import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Flashcard } from '../types';

interface StudySessionContextType {
  wrongAnswers: Flashcard[];
  addWrongAnswer: (card: Flashcard) => void;
  removeWrongAnswer: (card: Flashcard) => void;
  clearWrongAnswers: () => void;
}

const StudySessionContext = createContext<StudySessionContextType | undefined>(undefined);

export const useStudySession = () => {
  const context = useContext(StudySessionContext);
  if (!context) {
    throw new Error('useStudySession must be used within a StudySessionProvider');
  }
  return context;
};

interface StudySessionProviderProps {
  children: ReactNode;
}

export const StudySessionProvider = ({ children }: StudySessionProviderProps) => {
  const [wrongAnswers, setWrongAnswers] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('wrongAnswers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
  }, [wrongAnswers]);

  const addWrongAnswer = (card: Flashcard) => {
    // Avoid adding duplicates
    if (!wrongAnswers.find(c => c.spanish === card.spanish)) {
      setWrongAnswers(prev => [...prev, card]);
    }
  };

  const removeWrongAnswer = (card: Flashcard) => {
    setWrongAnswers(prev => prev.filter(c => c.spanish !== card.spanish));
  };

  const clearWrongAnswers = () => {
    setWrongAnswers([]);
  };

  const value = {
    wrongAnswers,
    addWrongAnswer,
    removeWrongAnswer,
    clearWrongAnswers,
  };

  return <StudySessionContext.Provider value={value}>{children}</StudySessionContext.Provider>;
}; 