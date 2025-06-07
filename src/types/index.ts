export type Category = 'animals' | 'food' | 'verbs';

export interface Flashcard {
  category: Category;
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice';
    options: string[];
  } | {
    type: 'fill-in-the-blank';
  };
} 