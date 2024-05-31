import { MakeWorkOffer } from './components/WorkOffer/MakeWorkOffer';
import { HomePage } from './pages/HomePage/HomePage';

export const routes = [
  {
    path: '*',
    element: <HomePage />,
  },
  {
    path: '/MakeWorkOffer',
    element: <MakeWorkOffer />,
  },
];
