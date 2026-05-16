import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Suggestions() {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_year: '',
    death_year: '',
    birth_place: '',
    biography: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Проверка авторизации
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('Для отправки предложения необходимо войти в аккаунт');
      navigate('/login');
      setLoading(false);
      return;
    }

    try {
      await api.post('/suggestions/', formData);
      
      toast.success('Предложение успешно отправлено! Спасибо за вклад ❤️');
      
      // Очищаем форму
      setFormData({
        full_name: '',
        birth_year: '',
        death_year: '',
        birth_place: '',
        biography: '',
      });

      // Перенаправляем на главную
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      console.error(err.response?.data);
      
      if (err.response?.status === 401) {
        toast.error('Сессия истекла. Войдите заново');
        navigate('/login');
      } else {
        toast.error('Ошибка при отправке предложения. Проверьте данные.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Предложить историческое лицо</h1>
        <p className="text-gray-600 text-lg">
          Знаете достойного человека, которого нет на сайте? Предложите его!
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ФИО (полностью) *</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              placeholder="Например: Алыкул Осмонов"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Год рождения</label>
              <input
                type="number"
                name="birth_year"
                value={formData.birth_year}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                placeholder="1900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Год смерти</label>
              <input
                type="number"
                name="death_year"
                value={formData.death_year}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                placeholder="1950"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Место рождения</label>
            <input
              type="text"
              name="birth_place"
              value={formData.birth_place}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              placeholder="Например: село Талас"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Биография *</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              required
              rows={8}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 resize-y"
              placeholder="Напишите ключевые факты из жизни этого человека..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-5 rounded-2xl text-lg hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-70"
          >
            {loading ? 'Отправка на модерацию...' : 'Отправить предложение на модерацию'}
          </button>
        </form>
      </div>

      <p className="text-center text-gray-500 mt-8">
        Ваше предложение будет рассмотрено администратором в ближайшее время
      </p>
    </div>
  );
}