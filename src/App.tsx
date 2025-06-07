import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StatsPage from './pages/StatsPage';
import FlashcardPage from './pages/FlashcardPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<CategorySelectionPage />} />
        <Route path="/study/:category" element={<FlashcardPage />} />
        <Route path="/quiz" element={<CategorySelectionPage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App; 