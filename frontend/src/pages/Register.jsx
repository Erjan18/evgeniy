import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
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
      // 1. Регистрация
      await api.post('/auth/register/', formData);

      // 2. Автоматический вход после регистрации
      const loginRes = await api.post('/auth/login/', {
        username: formData.username,
        password: formData.password,
      });

      // 3. Сохраняем данные
      localStorage.setItem('access_token', loginRes.data.access);
      localStorage.setItem('refresh_token', loginRes.data.refresh);
      localStorage.setItem('username', formData.username);

      toast.success('Регистрация и вход выполнены успешно! 🎉');
      navigate('/');        // Переход на главную
    } catch (err) {
      console.error(err.response?.data);
      
      const errors = err.response?.data;
      if (errors?.username) toast.error(`Имя пользователя: ${errors.username[0]}`);
      else if (errors?.email) toast.error(`Email: ${errors.email[0]}`);
      else if (errors?.password) toast.error(`Пароль: ${errors.password[0]}`);
      else toast.error('Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8">Регистрация</h2>

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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="Имя"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Пароль (минимум 8 символов)"
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
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}