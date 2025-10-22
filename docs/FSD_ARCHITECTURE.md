# Feature-Sliced Design Architecture

Этот проект следует методологии [Feature-Sliced Design (FSD)](https://feature-sliced.design/) для организации кода.

## 📁 Структура проекта

```
samurai-photochat-app/
├── app/                    # Слой приложения (App Layer)
│   ├── api/               # Next.js API routes
│   ├── auth/              # Страницы авторизации
│   ├── profile/           # Страницы профиля
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── providers/         # React providers (Redux, Theme, etc.)
│   └── store/             # Конфигурация Redux store
│
├── widgets/               # Слой виджетов (Widgets Layer)
│   ├── auth/             # Виджеты авторизации
│   ├── header/           # Хедер приложения
│   ├── mainPhotos/       # Галерея фото на главной
│   └── sidebar/          # Сайдбар
│
├── features/              # Слой фич (Features Layer)
│   ├── alert/            # Система уведомлений
│   ├── auth/             # Функционал авторизации
│   │   ├── api/          # API для авторизации
│   │   ├── model/        # Состояние авторизации (Redux)
│   │   ├── ui/           # UI компоненты
│   │   └── index.ts      # Public API фичи
│   ├── posts/            # Функционал постов
│   │   ├── api/          # API для работы с постами
│   │   ├── model/        # Состояние постов (Redux)
│   │   ├── ui/           # UI компоненты
│   │   └── index.ts      # Public API фичи
│   └── profile/          # Функционал профиля
│       ├── ui/           # UI компоненты профиля
│       └── index.ts      # Public API фичи
│
├── entities/              # Слой сущностей (Entities Layer)
│   └── user/             # Бизнес-сущность пользователя
│       ├── api/          # API для работы с пользователями
│       ├── index.ts      # Public API сущности
│       └── README.md     # Документация сущности
│
└── shared/                # Слой общего кода (Shared Layer)
    ├── api/              # Общие API утилиты (baseApi, baseQuery)
    ├── assets/           # Статические ресурсы
    ├── config/           # Конфигурация (routes, constants)
    ├── hooks/            # Общие React хуки
    ├── lib/              # Утилитарные библиотеки
    │   ├── api/          # API утилиты (handleError, etc.)
    │   ├── hooks/        # Общие хуки (useOutsideClick)
    │   └── redux/        # Redux хуки (useAppDispatch, useAppSelector)
    ├── model/            # Общее состояние приложения
    │   └── app/          # App-уровень state (theme, errors)
    ├── styles/           # Глобальные стили
    ├── ui/               # Переиспользуемые UI компоненты
    └── utils/            # Утилитарные функции
```

## 🎯 Принципы FSD

### 1. **Слоистая архитектура**

Проект разделен на 7 слоев (от высокого к низкому):
1. **app** — инициализация приложения
2. **processes** — сложные межстраничные сценарии (не используется)
3. **pages** — страницы приложения (в Next.js это `app/` директория)
4. **widgets** — независимые блоки страниц
5. **features** — части функциональности продукта
6. **entities** — бизнес-сущности
7. **shared** — переиспользуемый код без привязки к бизнес-логике

### 2. **Правило импортов**

- Слой может импортировать только из нижележащих слоев
- Запрещено импортировать из вышележащих слоев

```typescript
// ✅ Правильно
// features → entities
import { useGetUserProfileByIdQuery } from "@/entities/user"

// features → shared
import { useAppDispatch } from "@/shared/lib/redux"

// ❌ Неправильно  
// shared → features (нарушение правила импортов)
import { useLoginMutation } from "@/features/auth"
```

### 3. **Public API (index.ts)**

Каждый слайс должен предоставлять публичное API через `index.ts`:

```typescript
// features/auth/index.ts
export {
  authApi,
  useLoginMutation,
  useLogoutMutation,
} from "./api/authApi"

export { authSlice, authReducer } from "./model/authSlice"
```

### 4. **Сегментация слайсов**

Внутри каждого слайса используется стандартная сегментация:
- `api/` — взаимодействие с API
- `model/` — бизнес-логика и состояние
- `ui/` — UI компоненты
- `lib/` — вспомогательные функции
- `config/` — конфигурация

## 🚀 Примеры использования

### Работа с фичами

```typescript
// ✅ Используем public API
import { useLoginMutation } from "@/features/auth"
import { useCreatePostMutation } from "@/features/posts"

// ❌ Не импортируем напрямую
import { useLoginMutation } from "@/features/auth/api/authApi"
```

### Работа с entities

```typescript
// ✅ Используем public API
import { PublicProfileResponse, useGetUserProfileByIdQuery } from "@/entities/user"

// ❌ Не импортируем напрямую
import { PublicProfileResponse } from "@/entities/user/api/publicUserApi"
```

### Работа с shared

```typescript
// ✅ Используем из shared для общего кода
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux"
import { baseApi } from "@/shared/api"
import { Button, TextField } from "@/shared/ui"
```

## 📝 Миграция (выполнено)

### ✅ Завершенные задачи

1. **Переместили из `app/` в `shared/`:**
   - `app/hooks/` → `shared/lib/redux/` (Redux хуки)
   - `app/hooks/useOutsideClick` → `shared/lib/hooks/`
   - `app/utils/` → `shared/lib/api/`
   - `app/model/appSlice` → `shared/model/app/`
   - `app/api/baseApi` → `shared/api/`
   - `app/api/baseQuery` → `shared/api/`

2. **Создали слой `entities/`:**
   - `entities/user/` — бизнес-сущность пользователя
   - Переместили `app/api/publicUserApi` → `entities/user/api/`

3. **Создали Public API:**
   - `features/auth/index.ts`
   - `features/posts/index.ts`
   - `features/profile/index.ts`
   - `features/alert/index.ts`
   - `entities/user/index.ts`
   - `shared/*/index.ts`

4. **Обновили все импорты** в соответствии с новой структурой

### 🔄 Рекомендации для дальнейшего развития

1. **Разбить `features/posts`** (44 файла — слишком много):
   ```
   features/
   ├── create-post/      # Создание поста
   ├── edit-post/        # Редактирование поста
   ├── delete-post/      # Удаление поста
   └── posts-list/       # Отображение списка постов
   ```

2. **Создать дополнительные entities:**
   ```
   entities/
   ├── post/             # Сущность поста
   ├── session/          # Управление сессией
   └── user/             # ✅ Уже создан
   ```

3. **Вынести переиспользуемую логику** из features в entities

## 🔗 Полезные ссылки

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)
- [Best Practices](https://feature-sliced.design/docs/guides/tech/with-nextjs)

## 🤝 Контрибьюция

При добавлении новой функциональности:
1. Определите, к какому слою она относится
2. Создайте необходимые сегменты (api, model, ui)
3. Экспортируйте public API через index.ts
4. Следуйте правилам импортов
5. Обновите эту документацию при необходимости
