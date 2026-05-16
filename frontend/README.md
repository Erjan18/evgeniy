# 🇰🇬 Кыргыз Тарыхы — Исторические лица Кыргызстана

**Дипломная работа** — современный веб-портал о выдающихся исторических личностях Кыргызстана.

![Main Preview](https://via.placeholder.com/800x400?text=Кыргыз+Тарыхы)

## ✨ Основные возможности

- Красивый каталог исторических личностей с фотографиями
- Подробные биографии и информация о деятелях
- Система комментариев под каждой личностью
- Авторизация и регистрация пользователей (JWT)
- Форма предложения новых исторических лиц (с модерацией)
- Личный кабинет с просмотром своих предложений
- Адаптивный дизайн (полностью responsive)
- Удобная админ-панель с возможностью одобрения предложений

## 🛠 Технологический стек

**Backend:**
- Django 5.2 + Django REST Framework
- JWT Authentication (SimpleJWT)
- WhiteNoise (статика)
- Jazzmin (админ-панель)
- SQLite / PostgreSQL

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide Icons

**Деплой:**
- Backend: Railway
- Frontend: Vercel

## 🚀 Быстрый запуск локально

```bash
# 1. Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# 2. Frontend (в новом терминале)
cd frontend
npm install
npm run dev