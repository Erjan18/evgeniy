import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FiguresList from './pages/FiguresList';
import FigureDetail from './pages/FigureDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Suggestions from './pages/Suggestions';
import MySuggestions from './pages/MySuggestions';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/figures" element={<FiguresList />} />
          <Route path="/figures/:id" element={<FigureDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/my-suggestions" element={<MySuggestions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;