import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, UsersPage, AboutPage, PracticePage, ExpensesPage } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path='/expenses' element={<ExpensesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
