# Pages Layer (FSD)

Слой **pages** в Feature-Sliced Design содержит композиции страниц из widgets и features.

## Структура

```
(pages)/
├── home/              # Главная страница
├── sign-in/           # Страница входа
├── sign-up/           # Страница регистрации
├── profile/           # Страница профиля пользователя
├── privacy-policy/    # Политика конфиденциальности
└── terms-of-service/  # Условия использования
```

## Почему `(pages)` в скобках?

В Next.js директории в круглых скобках называются **Route Groups** и игнорируются роутером. 
Это позволяет использовать название `pages` для FSD слоя без конфликта с Next.js Pages Router.

## Правила слоя

1. **Композиция**: Pages композируют widgets и features, но не содержат бизнес-логику
2. **Без прямых импортов**: Pages не должны импортировать из других pages
3. **Типизация**: Все пропсы должны быть строго типизированы
4. **Серверные данные**: Получение данных происходит в Next.js route handlers (app/**/page.tsx), затем передается в pages компоненты

## Пример использования

```tsx
// app/page.tsx (Next.js route)
import { HomePage } from "@/pages/home"

export default async function Home() {
  const data = await fetchData()
  return <HomePage data={data} />
}

// (pages)/home/HomePage.tsx (FSD page)
export const HomePage = ({ data }: HomePageProps) => {
  return (
    <Layout>
      <Widget data={data} />
    </Layout>
  )
}
```

## Алиас импорта

Используйте `@/pages/*` для импорта компонентов из этого слоя:

```tsx
import { HomePage } from "@/pages/home"
import { SignInPage } from "@/pages/sign-in"
```
