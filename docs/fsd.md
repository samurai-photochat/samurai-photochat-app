# FSD в samurai-photochat-app — правила и практика

## Структура слоёв (src/)

- **app/** — роуты App Router, серверные компоненты, layout. Без бизнес-логики.
- **(pages)/** — композиция UI для страниц (Route Groups, не влияют на маршрутизацию).
- **widgets/** — крупные блоки страниц (композиции нескольких features + UI).
- **features/** — самостоятельные фичи (api, model, ui, lib, config).
- **entities/** — бизнес-сущности (api, model, ui, lib, config).
- **shared/** — переиспользуемое: api, store, lib, ui, styles, utils и т.д.

Сегментация внутри слайса: `api/`, `model/`, `ui/`, `lib/`, `config/`, `index.ts` (public API).

## Алиасы (tsconfig.json)

Используем абсолютные импорты:

- `@/*` → `src/*`
- `@/app/*` → `src/app/*`
- `@/pages/*` → `src/(pages)/*`
- `@/shared/*` → `src/shared/*`
- `@/features/*` → `src/features/*`
- `@/entities/*` → `src/entities/*`
- `@/widgets/*` → `src/widgets/*`

Пример:

```ts
import { StoreProvider } from "@/shared/providers"
import { useRegistrationMutation } from "@/features/auth"
import { PublicProfileResponse } from "@/entities/user"
```

## Правила импортов между слоями

- Слой может импортировать только «вниз»: app → widgets → features → entities → shared.
- Запрещено импортировать «вверх» (например, из shared в features — нельзя).
- Внешние импорты слайса — только через его `index.ts` (public API). Прямые deep-импорты вида `features/auth/api/authApi` снаружи — запрещены.

Примеры:

```ts
// ✅ Верно
import { useLoginMutation } from "@/features/auth"
import { useGetUserProfileByIdQuery } from "@/entities/user"
import { Button } from "@/shared/AccountManagement"

// ❌ Неверно
import { useLoginMutation } from "@/features/auth/api/authApi"
```

## Public API (barrel index.ts)

В каждом слайсе экспортируем всё, что может использовать внешний код:

```ts
// features/auth/index.ts
export * from "./api/authApi"
export { authSlice, authReducer } from "./model/authSlice"
export * from "./AccountManagement"
```

Внутренние детали, которые не предназначены для внешнего использования, не экспортируем в `index.ts`.

## Pages Layer: `(pages)/`

- Назначение: только композиция UI компонентов для конкретной страницы.
- Бизнес-логики в `(pages)` нет. Получение данных — в `app/**/page.tsx` или серверных функций (server actions), затем передаём пропсы в компонент страницы.
- Импорт страниц в роуты:

```ts
import { HomePage } from "@/pages/home"
```

## App Router (`app/`)

- Файлы `app/**/page.tsx` отвечают за роутинг и серверную работу с данными, минимум UI.
- `layout.tsx` — общий каркас.
- Провайдеры (Redux и др.) подключаются в корневом layout через `StoreProvider` из `@/shared/providers`.

## Состояние и данные

- **RTK Query**: базовый `baseApi` расположен в `@/shared/api/baseApi`.
  - Фичи расширяют `baseApi` собственными endpoint'ами в `features/**/api/*`.
- **Redux Store**: `@/shared/store/store.ts`.
  - Общий срез приложения (appSlice) — `@/shared/store/appSlice`.
  - Срезы фич — в `features/**/model/*` и регистрируются в сторе.
- **Хуки стора**: используем из `@/shared/store/*` (например, `useAppDispatch`).

## Серверные утилиты и ISR

- Общие server actions/фетчеры — `@/shared/api/server/serverActions.ts`.
- При фетчинге указываем `next: { revalidate, tags }` для ISR.

```ts
await fetch(url, { next: { revalidate: 60, tags: ["latest-posts"] } })
```

- Теги согласовываем между страницей и виджетами/фичами, чтобы инвалидация работала предсказуемо.

## UI и стили

- UI-атомы и переиспользуемые компоненты — в `@/shared/ui`.
- Компоненты фич/виджетов — в их `ui/`.
- Стили: CSS Modules (`*.module.scss`).
- Клиентские компоненты помечаем `"use client"` только там, где это действительно необходимо.

## Именование и структура

- Директории и файлы — `kebab-case`.
- Компоненты — `PascalCase.tsx`.
- Хуки — `useSomething.ts`.
- Бочка-экспорты (`index.ts`) на каждом уровне, где это повышает DX.

## Добавление новой функциональности — куда класть код

- Бизнес-сущность (модель/типы/запросы, переиспользуемая многими фичами) → `entities/<entity>/`.
- Пользовательская функция/процесс (логика в рамках одного юзкейса) → `features/<feature>/`.
- Крупная композиция UI из нескольких фич → `widgets/<widget>/`.
- Композиция страницы → `(pages)/<page>/`.
- Общие утилиты/компоненты без доменной привязки → `shared/`.

## Частые ошибки и как избежать

- **Deep import в фичу/сущность**: всегда импортируем через `index.ts`.
- **Логика в `(pages)`**: переносим в `app/**/page.tsx` (сервер) или во `features/**` (клиент).
- **Смешение слоёв**: UI атомы не зависят от фич/сущностей; фичи не тянут код из `(pages)` или `widgets`.
- **Лишний `"use client"`**: помечаем только интерактивные компоненты.
