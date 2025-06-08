import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Category } from '../types';

export interface CategoryStats {
  studied: number;
  correct: number;
  incorrect: number;
}

export type Stats = Record<Category, CategoryStats>;

interface StatsContextType {
  stats: Stats;
  trackStudy: (category: Category, result: 'correct' | 'incorrect') => void;
  trackQuiz: (category: Category, result: 'correct' | 'incorrect') => void;
  resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

interface StatsProviderProps {
  children: ReactNode;
}

const initialStats: Stats = {
  animals: { studied: 0, correct: 0, incorrect: 0 },
  food: { studied: 0, correct: 0, incorrect: 0 },
  verbs: { studied: 0, correct: 0, incorrect: 0 },
};

export const StatsProvider = ({ children }: StatsProviderProps) => {
  const [stats, setStats] = useState<Stats>(() => {
    try {
      const savedStats = localStorage.getItem('flashcardStats');
      return savedStats ? JSON.parse(savedStats) : initialStats;
    } catch (error) {
      console.error("Failed to parse stats from localStorage", error);
      return initialStats;
    }
  });

  useEffect(() => {
    localStorage.setItem('flashcardStats', JSON.stringify(stats));
  }, [stats]);

  const trackStudy = (category: Category, result: 'correct' | 'incorrect') => {
    setStats(prev => {
        const newStats = { ...prev };
        newStats[category].studied++;
        newStats[category][result]++;
        return newStats;
    });
  };

  const trackQuiz = (category: Category, result: 'correct' | 'incorrect') => {
    setStats(prev => {
        const newStats = { ...prev };
        // Quiz answers also count towards correct/incorrect, but not "studied" per spec
        newStats[category][result]++;
        return newStats;
    });
  };

  const resetStats = () => {
    setStats(initialStats);
  };

  const value = { stats, trackStudy, trackQuiz, resetStats };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}; 