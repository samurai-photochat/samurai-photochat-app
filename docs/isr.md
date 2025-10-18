# ISR (Incremental Static Regeneration) Implementation

## Обзор

Главная страница приложения использует ISR для оптимизации производительности и SEO. Это позволяет:

- ⚡ Мгновенная загрузка контента (статический HTML)
- 🔄 Автоматическое обновление контента каждые 60 секунд
- 🎯 On-demand ревалидация через API
- 🔍 SEO-оптимизация (серверный рендеринг)
- 🚀 Лучший UX для всех пользователей

## Архитектура

### Серверная часть (Server Components)

**Файл:** `app/page.tsx`

- Серверный компонент (без `"use client"`)
- `export const revalidate = 60` - ISR с интервалом 60 секунд
- Получение данных через native `fetch` с кэшированием Next.js

**Файл:** `app/lib/serverActions.ts`

- `getTotalUsersCount()` - количество пользователей
- `getLatestPosts()` - последние 4 поста
- Использует `next.revalidate` и `next.tags` для кэширования

### Клиентская часть (Client Components)

**Файл:** `app/_components/ClientAuthWrapper.tsx`

- Проверка авторизации через RTK Query (`/me`)
- Условный рендеринг Sidebar для авторизованных пользователей
- Публичный контент уже отрендерен на сервере

**Файл:** `widgets/mainPhotos/MainPhotosClient.tsx`

- Управление модальным окном
- Обработка кликов на посты
- Интерактивность (состояние React)

## Поток данных

```
1. Пользователь запрашивает главную страницу
   ↓
2. Next.js проверяет кэш (60 секунд)
   ↓
3. Если кэш валиден → возвращает статический HTML
   Если кэш истёк → фоновая регенерация
   ↓
4. Браузер получает HTML с данными
   ↓
5. React гидратируется на клиенте
   ↓
6. useMeQuery() проверяет авторизацию
   ↓
7. Sidebar появляется для авторизованных
```

## Кэширование

### Time-Based (каждые 60 секунд)

```typescript
export const revalidate = 60

const res = await fetch(url, {
  next: { revalidate: 60 },
})
```

### Tag-Based (по тегам)

```typescript
const res = await fetch(url, {
  next: {
    revalidate: 60,
    tags: ["latest-posts"],
  },
})
```

Теги используются для on-demand ревалидации:

- `users-count` - счетчик пользователей
- `latest-posts` - посты на главной

## On-Demand Revalidation API

### Endpoint

`GET /api/revalidate`

### Параметры

- `secret` (required) - секретный токен из `REVALIDATION_SECRET_TOKEN`
- `path` (optional) - путь для ревалидации (по умолчанию `/`)
- `tag` (optional) - тег для ревалидации конкретных данных

### Примеры использования

```bash
# Ревалидация главной страницы
curl "http://localhost:3000/api/revalidate?secret=dev_secret_123"

# Ревалидация по тегу (только посты)
curl "http://localhost:3000/api/revalidate?secret=dev_secret_123&tag=latest-posts"

# Ревалидация конкретного пути
curl "http://localhost:3000/api/revalidate?secret=dev_secret_123&path=/profile/123"
```

### Интеграция с бэкендом

Вы можете вызывать этот endpoint после:

- Регистрации нового пользователя → `tag=users-count`
- Создания нового поста → `tag=latest-posts`
- Обновления профиля → `path=/profile/[userId]`

Пример из Node.js:

```javascript
// После создания поста
await fetch(`${FRONTEND_URL}/api/revalidate?secret=${REVALIDATION_SECRET}&tag=latest-posts`, { method: "GET" })
```

## Гибридный подход: Native Fetch + RTK Query

### Почему не только RTK Query?

RTK Query использует React hooks → работает только в клиентских компонентах → нет SSG/ISR.

### Наш подход

1. **Native `fetch` на сервере** (публичные данные)
   - ISR с кэшированием Next.js
   - Быстрая первая загрузка
   - SEO-оптимизация

2. **RTK Query на клиенте** (динамические данные)
   - Авторизация (`/me`)
   - Мутации (создание постов)
   - Клиентский кэш

### Переиспользование типов

```typescript
// Типы RTK Query используются в серверных функциях
import { AllPostsResponse } from "@/features/posts/api/postsApi.types"

export async function getLatestPosts(): Promise<AllPostsResponse> {
  // native fetch с типами RTK Query
}
```

## Performance

### До ISR (Client-Side Rendering)

- ❌ Первая загрузка: ~2-3 секунды
- ❌ SEO: плохая индексация (JS required)
- ❌ UX: долгое ожидание контента

### После ISR (Server-Side Generation)

- ✅ Первая загрузка: ~100-300ms
- ✅ SEO: полная индексация (статический HTML)
- ✅ UX: мгновенный контент

## Настройка

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
REVALIDATION_SECRET_TOKEN=your_secret_token_here
```

### Генерация секретного токена

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Для разработки
REVALIDATION_SECRET_TOKEN=dev_secret_123
```

## Мониторинг

### Проверка работы ISR

1. Откройте Network DevTools
2. Загрузите главную страницу
3. Проверьте Response Headers:
   ```
   X-Nextjs-Cache: HIT  (из кэша)
   X-Nextjs-Cache: STALE (обновляется в фоне)
   X-Nextjs-Cache: MISS (новая генерация)
   ```

### Логирование

Добавьте в `next.config.ts`:

```typescript
export default {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}
```

Терминал покажет все fetch запросы и статус кэша.

## Troubleshooting

### Кэш не обновляется

1. Проверьте `export const revalidate = 60` в page.tsx
2. Убедитесь, что fetch использует `next.revalidate`
3. В dev режиме кэш может быть отключён

### On-demand revalidation не работает

1. Проверьте правильность токена в `.env.local`
2. Убедитесь, что токен совпадает в запросе
3. Проверьте логи сервера

### Данные не обновляются на клиенте

1. Убедитесь, что компонент использует `initialPosts` prop
2. Проверьте, что данные передаются из page.tsx
3. Очистите `.next` и пересоберите проект

## Best Practices

1. **Используйте теги** для гранулярной ревалидации
2. **Обрабатывайте ошибки** в серверных функциях
3. **Не передавайте большие объекты** через props (сериализация)
4. **Кэшируйте редко меняющиеся данные** дольше (revalidate: 3600)
5. **Защищайте revalidation endpoint** надёжным токеном

## Дальнейшие улучшения

- [ ] Добавить stale-while-revalidate стратегию
- [ ] Реализовать prefetching для других страниц
- [ ] Добавить мониторинг времени ревалидации
- [ ] Реализовать fallback для ошибок fetching
