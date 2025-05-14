import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import HomePage from './HomePage.jsx'
import SearchPage from './SearchPage.jsx';
import CardPage from './CardPage.jsx';
import SetPage from './SetPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SetPage />
  </StrictMode>,
);
