import { HomePage } from './pages/HomePage/HomePage';
import { Review } from './components/Review/Review';

export const routes = [
  { path: '*', element: <HomePage /> },
  { path: 'raiting', element: <Review /> },
];
