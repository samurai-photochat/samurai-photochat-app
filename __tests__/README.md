# 🧪 Тесты ISR/SSR/Revalidation

## ✅ Статус реализации

**Все тесты успешно реализованы и работают!**

```
Test Files  6 passed (6)
Tests       45 passed (45)
Duration    2.12s
```

## 📊 Покрытие тестами

### ISR (Incremental Static Regeneration) - 15 тестов

- ✅ Статическая генерация при билде (3 теста)
- ✅ Обработка ошибок API (2 теста)
- ✅ Структура данных (2 теста)
- ✅ Кэширование с тегами (1 тест)
- ✅ Динамический ISR для профилей (2 теста)
- ✅ 404 для несуществующих профилей (1 тест)
- ✅ Структура данных профиля (2 теста)
- ✅ Кэширование профилей (2 теста)

### SSR (Server-Side Rendering) - 9 тестов

- ✅ Серверный рендеринг компонентов (2 теста)
- ✅ Получение данных на сервере (2 теста)
- ✅ Server Actions (3 теста)
- ✅ Производительность SSR (2 теста)

### Revalidation - 20 тестов

- ✅ Безопасность endpoint (3 теста)
- ✅ Ревалидация по пути (2 теста)
- ✅ Ревалидация по тегу (3 теста)
- ✅ Приоритет параметров (1 тест)
- ✅ Формат ответа (2 теста)
- ✅ Теги кэширования (3 теста)
- ✅ Независимость тегов (2 теста)
- ✅ Гранулярная ревалидация (1 тест)
- ✅ Производительность с тегами (1 тест)
- ✅ Структура тегов (2 теста)

## 🚀 Запуск тестов

### Все тесты

```bash
npm test
```

### С UI интерфейсом

```bash
npm run test:ui
```

### Watch mode

```bash
npm run test:watch
```

### С покрытием кода

```bash
npm run test:coverage
```

### Только ISR тесты

```bash
npm run test:isr
```

### Только SSR тесты

```bash
npm run test:ssr
```

### Только Revalidation тесты

```bash
npm run test:revalidation
```

## 📁 Структура тестов

```
src/__tests__/
├── integration/
│   ├── isr/
│   │   ├── home-page-isr.test.ts          ✅ 8 тестов
│   │   └── profile-page-isr.test.ts       ✅ 7 тестов
│   ├── ssr/
│   │   └── server-rendering.test.ts       ✅ 9 тестов
│   └── revalidation/
│       ├── on-demand-revalidation.test.ts ✅ 11 тестов
│       └── tag-based-revalidation.test.ts ✅ 9 тестов
└── mocks/
    ├── handlers.ts                         # MSW handlers
    ├── server.ts                           # MSW server setup
    └── data/
        ├── users.ts                        # Моковые пользователи
        └── posts.ts                        # Моковые посты
```

## 🛠️ Технологии

- **Vitest** - современный тестовый фреймворк
- **MSW (Mock Service Worker)** - мокирование API
- **Testing Library** - утилиты для тестирования
- **Happy DOM** - легковесная DOM реализация

## 📝 Примеры тестов

### ISR тест

```typescript
it("должна получать данные о пользователях на сервере", async () => {
  const result = await getTotalUsersCount()

  expect(result).toBeDefined()
  expect(result.totalCount).toBe(3)
})
```

### SSR тест

```typescript
it("должна использовать Promise.all для параллельных запросов", async () => {
  const results = await Promise.all([getTotalUsersCount(), getLatestPosts(), getUserProfile(1)])

  expect(results[0]).toBeDefined()
  expect(results[1]).toBeDefined()
  expect(results[2]).toBeDefined()
})
```

### Revalidation тест

```typescript
it("должна возвращать 401 без токена", async () => {
  const request = new NextRequest("http://localhost:3000/api/revalidate")
  const response = await GET(request)

  expect(response.status).toBe(401)
})
```

## 🎯 Что тестируется

### ✅ ISR

- Статическая генерация страниц
- Автоматическая ревалидация через 60 секунд
- Кэширование с тегами
- Обработка ошибок
- Динамическая генерация профилей

### ✅ SSR

- Серверный рендеринг компонентов
- Получение данных на сервере
- Server Actions
- Параллельное выполнение запросов
- Производительность

### ✅ Revalidation

- On-demand ревалидация по пути
- On-demand ревалидация по тегу
- Безопасность API endpoint
- Гранулярная ревалидация
- Независимость тегов

## 📚 Документация

Подробный план тестирования: [docs/testing-plan-isr-ssr.md](../docs/testing-plan-isr-ssr.md)

## 🔍 Отладка

### VS Code

Используйте встроенную отладку Vitest в VS Code

### UI интерфейс

```bash
npm run test:ui
```

Откроет браузерный интерфейс с детальной информацией о тестах

## ✨ Преимущества

- ⚡ **Быстро**: тесты выполняются за 2 секунды
- 🎯 **Точно**: 45 тестов покрывают все сценарии
- 🔧 **Удобно**: простой запуск и отладка
- 📊 **Наглядно**: UI интерфейс для визуализации
- 🚀 **Современно**: Vitest + MSW - индустриальные стандарты

## 🎓 Результаты

```
✓ ISR тесты                    15/15 passed
✓ SSR тесты                     9/9 passed
✓ Revalidation тесты          20/20 passed
✓ Smoke тесты                   1/1 passed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Всего                       45/45 passed
```

**Все тесты работают корректно! 🎉**
