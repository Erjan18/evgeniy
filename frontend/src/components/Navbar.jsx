import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserCircle, LogOut, ListChecks, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            🇰🇬 <span className="hidden sm:inline">Кыргыз Тарыхы</span>
          </Link>

          {/* Десктоп меню */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            <Link to="/" className="hover:text-amber-300 transition">Главная</Link>
            <Link to="/figures" className="hover:text-amber-300 transition">Исторические лица</Link>
            <Link to="/suggestions" className="hover:text-amber-300 transition">Предложить лицо</Link>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative dropdown-container hidden md:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:text-amber-300 transition py-1 px-3 rounded-xl hover:bg-white/10"
                >
                  <UserCircle size={26} />
                  <span className="font-medium max-w-[130px] truncate">{user}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-5 py-4 border-b">
                      <p className="text-sm text-gray-500">Здравствуйте,</p>
                      <p className="font-semibold text-indigo-700">{user}</p>
                    </div>
                    <Link
                      to="/my-suggestions"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                    >
                      <ListChecks size={20} />
                      <span>Мои предложения</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition rounded-b-2xl"
                    >
                      <LogOut size={20} />
                      <span>Выйти</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="hover:text-amber-300 transition px-4 py-2">Войти</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-300 hover:text-black transition"
                >
                  Регистрация
                </Link>
              </div>
            )}

            {/* Мобильная кнопка меню */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-4 text-lg py-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 py-2">Главная</Link>
              <Link to="/figures" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 py-2">Исторические лица</Link>
              <Link to="/suggestions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 py-2">Предложить лицо</Link>

              {user ? (
                <>
                  <Link to="/my-suggestions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 py-2">Мои предложения</Link>
                  <button onClick={handleLogout} className="text-red-400 text-left py-2">Выйти из аккаунта</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-300 py-2">Войти</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-indigo-700 py-3 text-center rounded-xl font-semibold mt-2">Регистрация</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}