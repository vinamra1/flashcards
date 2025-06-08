export type Category = 'animals' | 'food' | 'verbs';
export type QuizType = 'multiple-choice' | 'fill-in-the-blank';

interface MultipleChoiceQuiz {
  type: 'multiple-choice';
  options: string[];
}

interface FillInTheBlankQuiz {
  type: 'fill-in-the-blank';
}

type Quiz = MultipleChoiceQuiz | FillInTheBlankQuiz;

export interface Flashcard {
  spanish: string;
  english: string;
  category: Category;
  quiz: Quiz;
} 