import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function FigureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [figure, setFigure] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFigure();
    fetchComments();
  }, [id]);

  const fetchFigure = async () => {
    try {
      const res = await api.get(`/figures/${id}/`);
      setFigure(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/?figure=${id}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('Для добавления комментария необходимо войти в аккаунт');
      navigate('/login');
      return;
    }

    try {
      await api.post('/comments/', {
        figure: parseInt(id),
        text: newComment
      });

      setNewComment('');
      fetchComments();
      toast.success('Комментарий успешно добавлен!');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Сессия истекла. Войдите заново');
        navigate('/login');
      } else {
        toast.error('Ошибка при добавлении комментария');
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl">Загрузка...</div>;
  if (!figure) return <div className="text-center py-20 text-2xl">Лицо не найдено</div>;

  return (
    
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/figures" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Назад к списку
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Большое фото */}
        <div className="h-80 md:h-96 bg-gray-200 relative">
          {figure.image ? (
            <img
  src={figure.image}
  alt={figure.full_name}
  className="w-full h-full object-cover"
  onError={(e) => {
    console.log("IMAGE ERROR:", figure.image);
    e.target.onerror = null;
    e.target.src =
      'https://via.placeholder.com/800x500/334155/ffffff?text=Фото+отсутствует';
  }}
/>


          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 text-9xl">
              👤
            </div>
          )}
        </div>

        <div className="p-8 md:p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{figure.full_name}</h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600 mb-8 text-lg">
            {figure.birth_year && <span>Родился: <strong>{figure.birth_year}</strong></span>}
            {figure.death_year && <span>Умер: <strong>{figure.death_year}</strong></span>}
            {figure.birth_place && <span>Место рождения: <strong>{figure.birth_place}</strong></span>}
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {figure.biography}
          </div>
        </div>
      </div>

      {/* Блок комментариев */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Комментарии ({comments.length})</h2>

        <form onSubmit={handleAddComment} className="mb-10 bg-white p-6 rounded-2xl shadow">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите ваш комментарий..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 min-h-[120px]"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition"
          >
            Опубликовать комментарий
          </button>
        </form>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-10">Комментариев пока нет. Будьте первым!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {comment.user?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}