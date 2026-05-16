import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Героическая секция — оптимизирована под мобильные */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-950 text-white pt-16 pb-20 md:pt-28 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_0%,transparent_70%)]"></div>
        
        <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 px-2">
            История Кыргызстана<br />
            <span className="text-amber-400">в лицах великих людей</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 px-2 text-gray-200">
            Сохраняем память о тех, кто формировал дух, культуру и будущее кыргызского народа
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 px-2">
            <Link
              to="/figures"
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-2xl transition transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              Посмотреть всех героев
            </Link>
            <Link
              to="/suggestions"
              className="border-2 border-white/70 hover:bg-white/10 font-semibold text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 rounded-2xl transition w-full sm:w-auto"
            >
              Предложить личность
            </Link>
          </div>
        </div>
      </div>

      {/* Краткая история Кыргызстана */}
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Краткая история Кыргызстана</h2>
          <p className="text-lg text-gray-600">От древних времён до наших дней</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl md:text-6xl mb-6">🏔️</div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Древние кыргызы</h3>
            <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
              Кыргызский народ имеет богатую историю, уходящую корнями в глубь веков. 
              Уже в VI–VIII веках упоминаются енисейские кыргызы.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl md:text-6xl mb-6">📜</div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Эпос «Манас»</h3>
            <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
              Самый длинный эпос в мире, внесённый в список нематериального наследия ЮНЕСКО.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl md:text-6xl mb-6">🌍</div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Новейшая история</h3>
            <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
              1991 год — обретение независимости. Сегодня Кыргызстан — демократическая республика.
            </p>
          </div>
        </div>
      </div>

      {/* Цитата */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12 md:py-20 border-t border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl md:text-3xl italic text-gray-700 leading-relaxed">
            «Кыргызский народ — это народ, который никогда не терял своей свободы, даже когда терял государство».
          </p>
          <p className="mt-6 text-amber-600 font-medium">— Чингиз Айтматов</p>
        </div>
      </div>

      {/* Финальный блок */}
      <div className="bg-indigo-700 text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Начните путешествие по истории</h2>
          <p className="text-lg md:text-xl mb-10 text-indigo-100">
            Более 50 выдающихся личностей уже ждут вас
          </p>
          <Link
            to="/figures"
            className="inline-block bg-white text-indigo-700 font-semibold text-lg md:text-xl px-10 md:px-14 py-5 md:py-6 rounded-2xl hover:bg-amber-300 hover:text-black transition shadow-xl"
          >
            Перейти к списку исторических лиц →
          </Link>
        </div>
      </div>
    </div>
  );
}