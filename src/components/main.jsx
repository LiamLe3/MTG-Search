import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '../css/index.css'
import HomePage from './Home/HomePage.jsx'
import SearchPage from './Search/SearchPage.jsx';
import CardPage from './Card/CardPage.jsx';
import SetPage from './Set/SetPage.jsx';
import AdvancedPage from './Advanced/AdvancedPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/advanced',
    element: <AdvancedPage />
  },
  {
    path: '/sets',
    element: <SetPage />
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/card/:set/:number',
    element: <CardPage />
  },
  {
    path: '/card/id/:cardId',
    element: <CardPage />
  }

]);

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

);
