import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Логотип и описание */}
          <div>
            <div className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
              🇰🇬 Кыргыз Тарыхы
            </div>
            <p className="text-gray-400 leading-relaxed">
              Информационный портал о выдающихся исторических личностях Кыргызстана. 
              Сохранение культурного наследия для будущих поколений.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Главная</Link></li>
              <li><Link to="/figures" className="hover:text-white transition">Исторические лица</Link></li>
              <li><Link to="/suggestions" className="hover:text-white transition">Предложить лицо</Link></li>
              <li><Link to="/my-suggestions" className="hover:text-white transition">Мои предложения</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h4 className="text-white font-semibold mb-4">Проект</h4>
            <ul className="space-y-2 text-sm">
              <li>Дипломная работа 2026</li>
              <li>Автор: Евгений</li>
              <li>Тема: Исторические лица Кыргызстана</li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white font-semibold mb-4">Связь</h4>
            <p className="text-sm leading-relaxed">
              По вопросам и предложениям:<br />
              <a href="mailto:example@email.com" className="hover:text-white transition">example@email.com</a>
            </p>
            <div className="mt-6 text-xs text-gray-500">
              © 2026 Кыргыз Тарыхы. Все права защищены.
            </div>
          </div>
        </div>

        {/* Нижняя линия */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          Сделано с уважением к истории и культуре Кыргызстана 🇰🇬
        </div>
      </div>
    </footer>
  );
}