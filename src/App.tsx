import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StatsPage from './pages/StatsPage';
import FlashcardPage from './pages/FlashcardPage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import RedoPage from './pages/RedoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<CategorySelectionPage mode="study" />} />
        <Route path="/study/:category" element={<FlashcardPage />} />
        <Route path="/study/redo" element={<RedoPage />} />
        <Route path="/quiz" element={<CategorySelectionPage mode="quiz" />} />
        <Route path="/quiz/:category/:quizType" element={<QuizPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App; 