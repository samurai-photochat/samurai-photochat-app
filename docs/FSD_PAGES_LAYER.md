# FSD Pages Layer - Документация

## Обзор изменений

Выделен слой **pages** согласно архитектуре Feature-Sliced Design (FSD).

## Структура проекта

```
src/
├── (pages)/              # 🆕 FSD Pages Layer - композиции страниц
│   ├── home/
│   ├── sign-in/
│   ├── sign-up/
│   ├── profile/
│   ├── privacy-policy/
│   ├── terms-of-service/
│   └── README.md
├── app/                  # Next.js App Router (роуты)
├── widgets/              # Композиции features
├── features/             # Бизнес-функции
├── entities/             # Бизнес-сущности
└── shared/               # Переиспользуемый код

```

## Почему `(pages)` в круглых скобках?

**Route Groups** в Next.js - это специальная фича, где директории в круглых скобках игнорируются роутером.

### Преимущества:
- ✅ Соответствует FSD архитектуре (слой называется `pages`)
- ✅ Нет конфликта с Next.js Pages Router
- ✅ Элегантное решение без костылей
- ✅ Поддерживается нативно Next.js

### Альтернативы (не используем):
- ❌ `views/` - не соответствует FSD терминологии
- ❌ `page-compositions/` - слишком длинное название
- ❌ `ui-pages/` - избыточное название

## Созданные страницы

### 1. HomePage (`(pages)/home/`)
- Композирует `MainPhotos` widget и `ClientAuthWrapper`
- Принимает данные о постах и количестве пользователей
- Используется в `app/page.tsx`

### 2. SignInPage (`(pages)/sign-in/`)
- Композирует `SignIn` widget
- Используется в `app/auth/signin/page.tsx`

### 3. SignUpPage (`(pages)/sign-up/`)
- Композирует `SignUpContent` widget с Suspense
- Используется в `app/auth/signup/page.tsx`

### 4. ProfilePage (`(pages)/profile/`)
- Композирует `Profile` feature
- Принимает данные профиля и userId
- Используется в `app/profile/[userId]/page.tsx`

### 5. PrivacyPolicyPage (`(pages)/privacy-policy/`)
- Композирует `PrivacyPolicy` widget
- Используется в `app/auth/signup/PrivacyPolicy/page.tsx`

### 6. TermsOfServicePage (`(pages)/terms-of-service/`)
- Композирует `TermsOfService` widget
- Используется в `app/auth/signup/TermsofService/page.tsx`

## Паттерн использования

### До (без pages layer):
```tsx
// app/page.tsx
export default async function Home() {
  const data = await fetchData()
  return (
    <ClientAuthWrapper>
      <MainPhotos data={data} />
    </ClientAuthWrapper>
  )
}
```

### После (с pages layer):
```tsx
// app/page.tsx - только роутинг и получение данных
export default async function Home() {
  const data = await fetchData()
  return <HomePage data={data} />
}

// (pages)/home/HomePage.tsx - композиция UI
export const HomePage = ({ data }: HomePageProps) => {
  return (
    <ClientAuthWrapper>
      <MainPhotos data={data} />
    </ClientAuthWrapper>
  )
}
```

## Преимущества

1. **Разделение ответственности**: 
   - `app/**/page.tsx` - роутинг и серверная логика
   - `(pages)/**` - композиция UI компонентов

2. **Переиспользование**: Pages компоненты можно использовать в разных роутах

3. **Тестирование**: Pages легче тестировать изолированно от Next.js роутинга

4. **FSD compliance**: Полное соответствие архитектуре FSD

5. **Типобезопасность**: Все пропсы строго типизированы

## Конфигурация

### tsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@/pages/*": ["./src/(pages)/*"]
    }
  }
}
```

### Импорты
```tsx
import { HomePage } from "@/pages/home"
import { SignInPage } from "@/pages/sign-in"
import { ProfilePage } from "@/pages/profile"
```

## Правила работы со слоем

1. **Только композиция**: Pages не содержат бизнес-логику
2. **Типизация обязательна**: Все пропсы должны иметь типы
3. **Нет импортов между pages**: Pages изолированы друг от друга
4. **Экспорт через index.ts**: Каждая page экспортируется через barrel файл

## Результат сборки

✅ **Сборка успешна** (`npm run build`)
- Все 10 страниц сгенерированы корректно
- Типы проверены
- Нет критических ошибок

## Следующие шаги

- [ ] Добавить unit-тесты для pages компонентов
- [ ] Рассмотреть выделение общих layout компонентов
- [ ] Документировать паттерны композиции для новых страниц
