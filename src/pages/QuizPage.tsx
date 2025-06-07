import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';

function QuizPage() {
  const { category } = useParams<{ category: string }>();
  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <Container>
      <h1>Quiz: {capitalizedCategory}</h1>
      <p>The quiz interface will be built here.</p>
    </Container>
  );
}

export default QuizPage; 