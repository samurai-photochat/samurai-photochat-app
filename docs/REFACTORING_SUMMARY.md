# FSD Refactoring Summary

## 📅 Дата рефакторинга
22 октября 2025

## ✅ Выполненные изменения

### 1. Миграция из `app/` в `shared/`

#### a) Redux хуки
- **Было:** `app/hooks/useAppDispatch.ts`, `app/hooks/useAppSelector.ts`
- **Стало:** `shared/lib/redux/useAppDispatch.ts`, `shared/lib/redux/useAppSelector.ts`
- **Public API:** `shared/lib/redux/index.ts`
- **Обновлено импортов:** 14 файлов

#### b) Общие хуки
- **Было:** `app/hooks/useOutsideClick.tsx`
- **Стало:** `shared/lib/hooks/useOutsideClick.tsx`
- **Public API:** `shared/lib/hooks/index.ts`
- **Обновлено импортов:** 4 файла

#### c) API утилиты
- **Было:** `app/utils/handleError.ts`, `app/utils/isErrorWithMessages.ts`
- **Стало:** `shared/lib/api/handleError.ts`, `shared/lib/api/isErrorWithMessages.ts`
- **Public API:** `shared/lib/api/index.ts`
- **Обновлено импортов:** 2 файла

#### d) Глобальное состояние приложения
- **Было:** `app/model/appSlice.ts`
- **Стало:** `shared/model/app/appSlice.ts`
- **Public API:** `shared/model/app/index.ts`
- **Обновлено импортов:** 4 файла

#### e) Базовые API конфигурации
- **Было:** `app/api/baseApi.ts`, `app/api/baseQuery.ts`
- **Стало:** `shared/api/baseApi.ts`, `shared/api/baseQuery.ts`
- **Public API:** `shared/api/index.ts`
- **Обновлено импортов:** 4 файла

### 2. Создание слоя `entities/`

#### Сущность `user`
```
entities/user/
├── api/
│   └── publicUserApi.ts     # API для публичных данных пользователей
├── index.ts                 # Public API
└── README.md               # Документация
```

**Экспорты:**
- `publicUserApi`
- `useGetTotalCountRegisteredUsersQuery`
- `useGetUserProfileByIdQuery`
- `PublicProfileResponse` (тип)

**Миграция:**
- `app/api/publicUserApi.ts` → `entities/user/api/publicUserApi.ts`
- Обновлено: 1 файл (`features/profile/ui/Profile/Profile.tsx`)

### 3. Создание Public API для features

#### `features/auth/index.ts`
```typescript
// API
export { authApi, useLoginMutation, useLogoutMutation, ... }
export type { ResendingEmailRequest, UserType, LoginType }

// Model
export { authSlice, authReducer, setToken, clearToken, ... }
```

#### `features/posts/index.ts`
```typescript
// API
export { postsApi, useCreatePostMutation, ... }
export type { Post, CreatePostRequest, ... }

// Model
export { postsSlice, postsReducer, addImageAC, ... }
```

#### `features/profile/index.ts`
```typescript
export { UserInfo, Profile }
```

#### `features/alert/index.ts`
```typescript
export { Alert }
```

### 4. Обновление документации

#### Создано:
- **`docs/FSD_ARCHITECTURE.md`** — полная документация по FSD архитектуре
- **`docs/REFACTORING_SUMMARY.md`** — этот файл
- **`entities/user/README.md`** — документация сущности user

#### Обновлено:
- **`README.md`** — добавлена секция Architecture с ссылкой на FSD документацию

### 5. Удаленные файлы

```
❌ app/hooks/useAppDispatch.ts
❌ app/hooks/useAppSelector.ts
❌ app/hooks/useOutsideClick.tsx
❌ app/utils/handleError.ts
❌ app/utils/isErrorWithMessages.ts
❌ app/model/appSlice.ts
❌ app/api/baseApi.ts
❌ app/api/baseQuery.ts
❌ app/api/publicUserApi.ts
```

## 📊 Статистика

- **Файлов создано:** 15
- **Файлов удалено:** 9
- **Файлов обновлено:** ~25
- **Public API создано:** 8
- **Импортов обновлено:** ~30

## 🎯 Результаты

### ✅ Достигнуто

1. **Правильная слоистая структура** — нарушений правила импортов не осталось
2. **Чистый слой `app/`** — остались только страницы, layouts, providers, store
3. **Создан слой `entities/`** — выделена бизнес-сущность user
4. **Public API** — все features и entities имеют публичное API
5. **Документация** — полная документация по архитектуре
6. **TypeScript компиляция** — проходит успешно (3 существующие ошибки не связаны с рефакторингом)

### 📈 Улучшения

#### До рефакторинга:
```
app/
├── hooks/        ❌ Нарушение FSD
├── utils/        ❌ Нарушение FSD
├── model/        ❌ Нарушение FSD
└── api/          ❌ Нарушение FSD

features/ → app/  ❌ 25 нарушений импортов
widgets/ → app/   ❌ Нарушений импортов
```

#### После рефакторинга:
```
app/
├── api/          ✅ Next.js API routes
├── auth/         ✅ Страницы
├── profile/      ✅ Страницы
├── layout.tsx    ✅ Layout
├── page.tsx      ✅ Главная страница
├── providers/    ✅ Providers
└── store/        ✅ Store config

shared/
├── api/          ✅ Базовые API конфиги
├── lib/          ✅ Утилиты и хуки
├── model/        ✅ Глобальное состояние
└── ui/           ✅ UI компоненты

entities/
└── user/         ✅ Бизнес-сущность

features/         ✅ Имеют Public API
widgets/          ✅ Используют нижние слои
```

## 🚀 Рекомендации для дальнейшего развития

### Приоритет 1: Декомпозиция `features/posts`

Текущая проблема: `features/posts/` содержит 44 файла — это слишком много для одного фича-слайса.

**Решение:**
```
features/
├── create-post/              # Создание поста
│   ├── ui/
│   │   ├── PostSettingModal/
│   │   ├── AddFotoStep/
│   │   ├── CroppingStep/
│   │   ├── FiltersStep/
│   │   └── PublicationStep/
│   └── index.ts
│
├── edit-post/                # Редактирование поста
│   ├── ui/
│   │   └── PostEditMode/
│   └── index.ts
│
├── delete-post/              # Удаление поста
│   └── index.ts
│
├── posts-feed/               # Лента постов
│   ├── ui/
│   │   ├── PostsList/
│   │   └── PostModal/
│   └── index.ts
│
└── posts-grid/               # Сетка постов профиля
    ├── ui/
    └── index.ts
```

### Приоритет 2: Создание дополнительных entities

```
entities/
├── post/                     # Сущность поста
│   ├── api/
│   │   └── postsApi.ts      # Базовые CRUD операции
│   ├── model/
│   │   ├── types.ts         # Post, PostImage, etc.
│   │   └── postsSlice.ts    # Базовое состояние
│   ├── ui/
│   │   ├── PostCard/        # Карточка поста
│   │   └── PostImage/       # Изображение поста
│   └── index.ts
│
├── session/                  # Управление сессией
│   ├── model/
│   │   ├── sessionSlice.ts
│   │   └── sessionStorage.ts
│   └── index.ts
│
└── user/                     ✅ Уже создан
```

### Приоритет 3: Вынести переиспользуемую логику

Из `features/` в `entities/`:
- Типы постов → `entities/post/model/types.ts`
- CRUD операции → `entities/post/api/postsApi.ts`
- Базовые UI компоненты → `entities/post/ui/`

### Приоритет 4: Исправить существующие ошибки TypeScript

```typescript
// features/posts/ui/PostModal/context/PostModalContext.tsx
// widgets/auth/ui/SignUpContent/SignUpContent.tsx

// Проблема: searchParams может быть null
const searchParams = useSearchParams()
const code = searchParams.get("code") // ❌ searchParams is possibly 'null'

// Решение:
const code = searchParams?.get("code")
```

## 📝 Чеклист для новых фич

При добавлении новой функциональности:

- [ ] Определил правильный слой (features/entities/shared)
- [ ] Создал необходимые сегменты (api/model/ui/lib)
- [ ] Создал Public API через index.ts
- [ ] Следую правилу импортов (только из нижних слоев)
- [ ] Обновил документацию при необходимости
- [ ] Добавил TypeScript типы
- [ ] Проверил компиляцию: `npx tsc --noEmit`

## 🔗 Полезные ссылки

- [Feature-Sliced Design](https://feature-sliced.design/)
- [FSD с Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs)
- [FSD Examples](https://github.com/feature-sliced/examples)
- [Архитектура проекта](./FSD_ARCHITECTURE.md)

## 👤 Автор рефакторинга

FSD рефакторинг выполнен в соответствии с официальной методологией Feature-Sliced Design.
