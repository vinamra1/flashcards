import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';

function NotFoundPage() {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button-link">Go to Home</Link>
    </Container>
  );
}

export default NotFoundPage; 