import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function MySuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySuggestions();
  }, []);

  const fetchMySuggestions = async () => {
    try {
      const res = await api.get('/suggestions/');
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Не удалось загрузить ваши предложения');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-2xl">Загрузка ваших предложений...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Мои предложения</h1>
        <Link
          to="/suggestions"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          + Предложить новое лицо
        </Link>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-white rounded-3xl shadow p-16 text-center">
          <p className="text-2xl text-gray-400">Вы ещё не отправляли предложений</p>
          <Link to="/suggestions" className="text-indigo-600 hover:underline mt-4 inline-block">
            Предложить первое историческое лицо →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{suggestion.full_name}</h3>
                  <p className="text-gray-600 mt-1">
                    {suggestion.birth_year && `${suggestion.birth_year}`} 
                    {suggestion.death_year && ` — ${suggestion.death_year}`}
                  </p>
                </div>

                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  suggestion.status === 'approved' ? 'bg-green-100 text-green-700' :
                  suggestion.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {suggestion.status === 'approved' && '✅ Одобрено'}
                  {suggestion.status === 'rejected' && '❌ Отклонено'}
                  {suggestion.status === 'pending' && '⏳ На рассмотрении'}
                </span>
              </div>

              {suggestion.birth_place && (
                <p className="text-gray-600 mt-3">📍 {suggestion.birth_place}</p>
              )}

              <p className="mt-5 text-gray-700 line-clamp-4">
                {suggestion.biography}
              </p>

              <p className="text-xs text-gray-500 mt-6">
                Отправлено: {new Date(suggestion.created_at).toLocaleDateString('ru-RU')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}