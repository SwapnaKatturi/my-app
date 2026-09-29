import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, UsersPage, AboutPage, PracticePage } from './pages';
import { lazy, Suspense } from 'react';

const ExpensesPage = lazy(() => import('./pages/ExpensesPage'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="page-wrapper">
          <Suspense fallback={<p>Loading Page...</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path='/expenses' element={<ExpensesPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
