# JJS Moveset Generator — Project

## Статус: CLOSED BETA

Пет-проект. Полностью изолирован от COLUMBUS.

## Архитектура

- **GitHub**: `sverdlikdan-code/jjs-moveset-generator`
- **Хостинг**: Railway (auto-deploy on push to master)
- **База данных**: Supabase (project: `jjs-generator`, ID: `karnkpgzgmvwgioowijp`)
- **Стек**: Node.js / Express + @mongodb-js/zstd + @supabase/supabase-js + helmet + express-rate-limit

## Страницы

| URL | Назначение |
|-----|-----------|
| `/` | Лендинг + password gate |
| `/app.html` | Генератор кодов + декодер |
| `/library.html` | Галерея кодов сообщества |

## Доступ

- **Пароль**: `JJS2026` (Railway env: BETA_PASSWORD)
- **Closed Beta**: лимиты отключены
- **Сессия**: 30 дней в localStorage
- **API Token**: SHA-256 hash(pass + 'jjs_api_v1'), хранится в jjs_api_token

## База данных (Supabase)

- Таблица `codes`: id, name, character, code (base64 zstd), tags[], author, likes, copies, created_at
- Таблица `comments`: id, code_id, text, author, likes, created_at
- RLS: только service_role может писать (INSERT/UPDATE)

## API

| Endpoint | Метод | Auth | Описание |
|----------|-------|------|---------|
| `/api/auth` | POST | — | Проверка пароля → token |
| `/api/generate` | POST | Bearer | Генерация JJS кода |
| `/api/decode` | POST | Bearer | Декодирование кода → anime cards |
| `/api/library` | GET | Bearer | Список кодов (sort: likes/copies/new) |
| `/api/library/:id` | GET | Bearer | Один код + bump copies |
| `/api/library/:id/like` | POST | Bearer | Лайк |
| `/api/library` | POST | Bearer | Добавить код |
| `/api/library/:id/comments` | GET/POST | Bearer | Комментарии |

## Security (закрыто)

- ✅ CRIT-01 XSS — escHtml + ALLOWED_TYPES whitelist
- ✅ CRIT-02 Supabase RLS — TO service_role
- ✅ HIGH — requireToken middleware
- ✅ HIGH — Rate limiting (120/10/10 per 15min)
- ✅ HIGH — Helmet.js CSP + trust proxy
- ✅ HIGH — Input validation (100kb, zstd bomb, 50 moves max)
- ⏳ MED-01..04 — после беты

## Pending

- Stripe $4.99 one-time unlock
- Free vs Pro лимиты
- Кастомный домен
