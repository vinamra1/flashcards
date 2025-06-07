import { Flashcard, Category } from '../types';

const flashcards: Flashcard[] = [
  // Animals
  {
    category: "animals",
    spanish: "el gato",
    english: "the cat",
    quiz: {
      type: "multiple-choice",
      options: ["the dog", "the house", "the cat", "the bird"]
    }
  },
  {
    category: "animals",
    spanish: "el perro",
    english: "the dog",
    quiz: {
      type: "multiple-choice",
      options: ["the cat", "the fish", "the dog", "the tree"]
    }
  },
  {
    category: "animals",
    spanish: "el pájaro",
    english: "the bird",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  // Food
  {
    category: "food",
    spanish: "la manzana",
    english: "the apple",
    quiz: {
      type: "multiple-choice",
      options: ["the orange", "the apple", "the banana", "the bread"]
    }
  },
  {
    category: "food",
    spanish: "el pan",
    english: "the bread",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "food",
    spanish: "el queso",
    english: "the cheese",
    quiz: {
      type: "multiple-choice",
      options: ["the milk", "the cheese", "the water", "the wine"]
    }
  },
  // Verbs
  {
    category: "verbs",
    spanish: "comer",
    english: "to eat",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "beber",
    english: "to drink",
    quiz: {
      type: "multiple-choice",
      options: ["to run", "to sleep", "to drink", "to speak"]
    }
  },
  {
    category: "verbs",
    spanish: "vivir",
    english: "to live",
    quiz: {
      type: "fill-in-the-blank"
    }
  }
];

export const getCategories = (): Category[] => {
  return [...new Set(flashcards.map(card => card.category))];
};

export const getFlashcardsByCategory = (category: Category): Flashcard[] => {
  return flashcards.filter(card => card.category === category);
}; 