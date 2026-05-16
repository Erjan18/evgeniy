import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function FiguresList() {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFigures();
  }, []);

  const fetchFigures = async () => {
    try {
      const res = await api.get('/figures/');
      setFigures(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFigures = figures.filter(f =>
    f.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (f.biography && f.biography.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <div className="text-center py-20 text-2xl">Загрузка...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Исторические лица</h1>
        
        <div className="w-full sm:w-96">
          <input
            type="text"
            placeholder="Поиск по имени или биографии..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 text-base placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredFigures.map((figure) => (
          <Link 
            to={`/figures/${figure.id}`} 
            key={figure.id}
            className="figure-card bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
          >
            <div className="h-56 sm:h-64 bg-gray-200 relative">
              {figure.image ? (
                <img 
                  src={figure.image}
                  alt={figure.full_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300/334155/ffffff?text=Нет+фото';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-7xl">
                  👤
                </div>
              )}
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">{figure.full_name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                {figure.biography?.substring(0, 130)}...
              </p>
              <div className="flex justify-between text-xs md:text-sm text-gray-500">
                {figure.birth_year && <span>Род. {figure.birth_year}</span>}
                {figure.death_year && <span>Умер {figure.death_year}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}