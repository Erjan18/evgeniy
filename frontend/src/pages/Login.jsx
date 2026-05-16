import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login/', formData);
      
      // Сохраняем токены и имя пользователя
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('username', formData.username);   // ← Важно для Navbar

      toast.success('Успешный вход! Добро пожаловать');
      navigate('/');           // ← Переход на главную, как ты просил
    } catch (err) {
      console.error(err.response?.data);
      toast.error('Неверные данные для входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8">Вход в аккаунт</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition disabled:opacity-70"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}