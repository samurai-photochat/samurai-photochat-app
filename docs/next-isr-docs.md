# Руководство по SSR/ISR в Next.js

## Содержание

1. [Введение](#введение)
2. [Теория рендеринга](#теория-рендеринга)
3. [Static Site Generation (SSG)](#static-site-generation-ssg)
4. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
5. [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
6. [Ревалидация данных](#ревалидация-данных)
7. [Практические примеры](#практические-примеры)
8. [Проверка настроек](#проверка-настроек)
9. [Лучшие практики](#лучшие-практики)

---

## Введение

Next.js предоставляет несколько стратегий рендеринга, которые позволяют оптимизировать производительность и пользовательский опыт вашего приложения. Понимание различий между этими стратегиями критически важно для создания эффективных веб-приложений.

### Зачем это нужно?

- **Производительность**: Статические страницы загружаются мгновенно
- **SEO**: Поисковые системы получают полностью отрендеренный HTML
- **Масштабируемость**: Статический контент легко кешируется CDN
- **Актуальность данных**: ISR позволяет обновлять контент без полной пересборки

---

## Теория рендеринга

### Типы рендеринга в Next.js

#### 1. **Client-Side Rendering (CSR)**

- Рендеринг происходит в браузере
- Сервер отдает минимальный HTML + JavaScript
- Данные загружаются после монтирования компонента
- ❌ Плохо для SEO
- ❌ Медленная первая загрузка

#### 2. **Static Site Generation (SSG)**

- Страницы генерируются на этапе сборки (`npm run build`)
- HTML создается один раз и переиспользуется
- ✅ Максимальная производительность
- ✅ Отличное SEO
- ❌ Данные могут устареть

#### 3. **Server-Side Rendering (SSR)**

- Страница рендерится на сервере при каждом запросе
- Всегда свежие данные
- ✅ Отличное SEO
- ✅ Актуальные данные
- ❌ Медленнее, чем SSG
- ❌ Нагрузка на сервер

#### 4. **Incremental Static Regeneration (ISR)**

- Комбинация SSG и SSR
- Статическая генерация + фоновое обновление
- ✅ Быстрая загрузка
- ✅ Актуальные данные
- ✅ Низкая нагрузка на сервер

---

## Static Site Generation (SSG)

### App Router (Next.js 13+)

По умолчанию все страницы в App Router являются статическими.

```tsx
// app/blog/page.tsx
interface Post {
  id: string
  title: string
  content: string
}

export default async function BlogPage() {
  // Этот fetch будет выполнен на этапе сборки
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  return (
    <main>
      <h1>Блог</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

### Динамические маршруты с SSG

Для динамических маршрутов используйте `generateStaticParams`:

```tsx
// app/blog/[id]/page.tsx
interface Post {
  id: string
  title: string
  content: string
}

// Генерируем список страниц для статической генерации
export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  return posts.map((post) => ({
    id: post.id,
  }))
}

// Компонент страницы
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`https://api.example.com/posts/${id}`)
  const post: Post = await res.json()

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### Что это дает?

- Все страницы генерируются во время `npm run build`
- HTML файлы создаются заранее и хранятся на диске
- При запросе сервер мгновенно отдает готовый HTML
- Идеально для контента, который редко меняется

### Как проверить?

```bash
# Соберите проект
npm run build

# В выводе вы увидите:
# ○ (Static)  - статическая страница
# ● (SSG)     - статическая с данными
```

---

## Server-Side Rendering (SSR)

### App Router

Для SSR используйте опцию `cache: 'no-store'` в fetch или установите `dynamic = 'force-dynamic'`:

#### Способ 1: no-store в fetch

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Этот запрос будет выполняться при каждом обращении к странице
  const res = await fetch("https://api.example.com/user/data", {
    cache: "no-store",
  })
  const data = await res.json()

  return (
    <div>
      <h1>Панель управления</h1>
      <p>Последнее обновление: {new Date().toLocaleString()}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

#### Способ 2: force-dynamic

```tsx
// app/dashboard/page.tsx
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const res = await fetch("https://api.example.com/user/data")
  const data = await res.json()

  return (
    <div>
      <h1>Панель управления</h1>
      <p>Текущее время: {new Date().toLocaleString()}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

### Pages Router (устаревший подход)

```tsx
// pages/dashboard.tsx
import type { GetServerSideProps } from "next"

interface Props {
  data: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const res = await fetch("https://api.example.com/user/data")
  const data = await res.json()

  return {
    props: { data },
  }
}

export default function Dashboard({ data }: Props) {
  return (
    <div>
      <h1>Панель управления</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

### Что это дает?

- Страница рендерится на сервере при каждом запросе
- Всегда актуальные данные
- Можно использовать данные из cookies, headers
- Доступ к серверным ресурсам (БД, файловая система)

### Когда использовать?

- Персонализированный контент (профиль пользователя)
- Данные, требующие аутентификации
- Часто меняющиеся данные (биржевые котировки)
- Контент, зависящий от запроса (геолокация, язык)

### Как проверить?

```bash
npm run build

# В выводе вы увидите:
# λ (Server)  - SSR страница
```

---

## Incremental Static Regeneration (ISR)

ISR - это золотая середина между SSG и SSR. Страница генерируется статически, но периодически обновляется в фоновом режиме.

### App Router

#### Временная ревалидация (Time-based)

```tsx
// app/blog/page.tsx
interface Post {
  id: string
  title: string
  content: string
}

// Ревалидация каждые 60 секунд
export const revalidate = 60

export default async function BlogPage() {
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  return (
    <main>
      <h1>Блог</h1>
      <p>Последнее обновление: {new Date().toLocaleString()}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

#### Ревалидация на уровне fetch

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Этот запрос будет кешироваться на 3600 секунд (1 час)
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 },
  })
  const products = await res.json()

  return (
    <div>
      <h1>Товары</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

#### Динамические маршруты с ISR

```tsx
// app/blog/[id]/page.tsx
interface Post {
  id: string
  title: string
  content: string
}

// Ревалидация каждые 60 секунд
export const revalidate = 60

// Генерируем статические страницы для известных постов
export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`https://api.example.com/posts/${id}`)
  const post: Post = await res.json()

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Обновлено: {new Date().toLocaleString()}</small>
    </article>
  )
}
```

### Pages Router

```tsx
// pages/blog/[id].tsx
import type { GetStaticProps, GetStaticPaths } from "next"

interface Post {
  id: string
  title: string
  content: string
}

interface Props {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  return {
    paths,
    fallback: "blocking", // или true для показа fallback UI
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(`https://api.example.com/posts/${params?.id}`)
  const post: Post = await res.json()

  return {
    props: { post },
    revalidate: 60, // Ревалидация каждые 60 секунд
  }
}

export default function Post({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### Как работает ISR?

1. **Первый запрос**: Отдается статически сгенерированная страница (быстро)
2. **Истечение времени**: Если прошло больше `revalidate` секунд
3. **Фоновая регенерация**: Next.js запускает регенерацию страницы в фоне
4. **Следующий запрос**: Пользователь получает обновленную страницу

### Что это дает?

- ✅ Быстрая загрузка (как SSG)
- ✅ Актуальные данные (почти как SSR)
- ✅ Низкая нагрузка на сервер
- ✅ Автоматическое обновление контента

### Когда использовать?

- Блоги и новостные сайты
- Каталоги товаров
- Документация
- Любой контент, который обновляется периодически

---

## Ревалидация данных

### 1. Временная ревалидация (Time-based)

Автоматическое обновление через определенный интервал времени.

```tsx
// Ревалидация на уровне страницы
export const revalidate = 3600 // 1 час

// Ревалидация на уровне fetch
fetch("https://api.example.com/data", {
  next: { revalidate: 3600 },
})
```

### 2. Ревалидация по требованию (On-demand)

#### Использование revalidatePath

```tsx
// app/actions.ts
"use server"

import { revalidatePath } from "next/cache"

export async function updatePost() {
  // Обновить конкретную страницу
  revalidatePath("/blog/post-1")

  // Обновить все страницы блога
  revalidatePath("/blog", "page")

  // Обновить весь layout
  revalidatePath("/blog", "layout")
}
```

#### Использование revalidateTag

```tsx
// Пометить fetch тегом
fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
})

// В Server Action
;("use server")

import { revalidateTag } from "next/cache"

export async function createPost() {
  // Инвалидировать все запросы с тегом 'posts'
  revalidateTag("posts")
}
```

#### API Route для ревалидации

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag")

  if (!tag) {
    return NextResponse.json({ revalidated: false, message: "Missing tag parameter" }, { status: 400 })
  }

  revalidateTag(tag)

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  })
}
```

Использование:

```bash
# Ревалидировать все запросы с тегом 'posts'
curl http://localhost:3000/api/revalidate?tag=posts
```

### 3. Глобальная ревалидация

```tsx
"use server"

import { revalidatePath } from "next/cache"

export async function revalidateEverything() {
  // Ревалидировать все страницы приложения
  revalidatePath("/", "layout")
}
```

---

## Практические примеры

### Пример 1: Блог с ISR

```tsx
// app/blog/page.tsx
interface Post {
  id: string
  title: string
  excerpt: string
  createdAt: string
}

export const revalidate = 300 // 5 минут

export default async function BlogPage() {
  const res = await fetch("https://api.example.com/posts", {
    next: { tags: ["posts"] },
  })
  const posts: Post[] = await res.json()

  return (
    <div className="container">
      <h1>Наш блог</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
    </div>
  )
}
```

```tsx
// app/blog/[slug]/page.tsx
interface Post {
  id: string
  slug: string
  title: string
  content: string
  createdAt: string
}

export const revalidate = 300

export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts")
  const posts: Post[] = await res.json()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { tags: ["posts", `post-${slug}`] },
  })
  const post: Post = await res.json()

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

```tsx
// app/actions/posts.ts
"use server"

import { revalidateTag } from "next/cache"

export async function createPost(formData: FormData) {
  const title = formData.get("title")
  const content = formData.get("content")

  // Создать пост в БД
  await fetch("https://api.example.com/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  })

  // Инвалидировать кеш постов
  revalidateTag("posts")
}

export async function updatePost(slug: string, formData: FormData) {
  // Обновить пост
  await fetch(`https://api.example.com/posts/${slug}`, {
    method: "PUT",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "Content-Type": "application/json" },
  })

  // Инвалидировать конкретный пост
  revalidateTag(`post-${slug}`)
  revalidateTag("posts")
}
```

### Пример 2: Каталог товаров с разными стратегиями

```tsx
// app/products/page.tsx
// ISR для списка товаров (обновляется каждый час)
export const revalidate = 3600

export default async function ProductsPage() {
  const res = await fetch("https://api.example.com/products", {
    next: { tags: ["products"] },
  })
  const products = await res.json()

  return (
    <div>
      <h1>Каталог товаров</h1>
      <div className="products-grid">
        {products.map((product: any) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

```tsx
// app/products/[id]/page.tsx
// ISR для страниц товаров
export const revalidate = 1800 // 30 минут

export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/products")
  const products = await res.json()

  return products.map((product: any) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Детали товара с ISR
  const productRes = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 1800, tags: ["products", `product-${id}`] },
  })
  const product = await productRes.json()

  // Отзывы всегда свежие (SSR)
  const reviewsRes = await fetch(`https://api.example.com/products/${id}/reviews`, {
    cache: "no-store",
  })
  const reviews = await reviewsRes.json()

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">{product.price} ₽</p>

      <section>
        <h2>Отзывы</h2>
        {reviews.map((review: any) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <small>{review.author}</small>
          </div>
        ))}
      </section>
    </div>
  )
}
```

### Пример 3: Профиль пользователя (SSR)

```tsx
// app/profile/page.tsx
import { cookies } from "next/headers"

// Принудительный SSR
export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return <div>Пожалуйста, войдите в систему</div>
  }

  const res = await fetch("https://api.example.com/user/profile", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: "no-store",
  })

  const user = await res.json()

  return (
    <div>
      <h1>Профиль</h1>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Последний вход: {new Date(user.lastLogin).toLocaleString()}</p>
    </div>
  )
}
```

### Пример 4: Кеширование с unstable_cache

```tsx
// lib/data.ts
import { unstable_cache } from "next/cache"
import { db } from "@/lib/db"

export const getUserById = unstable_cache(
  async (userId: string) => {
    return db.user.findUnique({
      where: { id: userId },
    })
  },
  ["user-by-id"],
  {
    tags: ["users"],
    revalidate: 3600, // 1 час
  }
)

export const getPostsByUser = unstable_cache(
  async (userId: string) => {
    return db.post.findMany({
      where: { authorId: userId },
    })
  },
  ["posts-by-user"],
  {
    tags: ["posts", "users"],
    revalidate: 600, // 10 минут
  }
)
```

---

## Проверка настроек

### 1. Проверка во время сборки

```bash
npm run build
```

Вывод покажет тип каждой страницы:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5 kB           85 kB
├ ○ /blog                                8 kB           88 kB
├ ● /blog/[slug]                         12 kB          92 kB
├   ├ /blog/first-post
├   └ /blog/second-post
└ λ /profile                             3 kB           83 kB

○  (Static)   - статическая страница
●  (SSG)      - статическая с данными
λ  (Server)   - SSR страница
```

### 2. Проверка заголовков HTTP

```bash
# Проверить заголовки кеширования
curl -I http://localhost:3000/blog

# Вы должны увидеть:
# Cache-Control: s-maxage=60, stale-while-revalidate
```

### 3. Проверка в режиме разработки

⚠️ **Важно**: В режиме разработки (`npm run dev`) ISR и кеширование **не работают**!

Всегда тестируйте в production режиме:

```bash
npm run build
npm start
```

### 4. Проверка ревалидации

```tsx
// Добавьте временную метку на страницу
export default async function Page() {
  const buildTime = new Date().toISOString()

  return (
    <div>
      <p>Страница сгенерирована: {buildTime}</p>
    </div>
  )
}
```

Обновите страницу несколько раз:

- Если время не меняется - работает кеширование
- Если время обновилось после истечения `revalidate` - ISR работает

### 5. Инструменты разработчика

В Chrome DevTools:

1. Откройте Network tab
2. Обновите страницу
3. Проверьте заголовки ответа:
   - `x-nextjs-cache: HIT` - страница из кеша
   - `x-nextjs-cache: MISS` - страница сгенерирована заново
   - `x-nextjs-cache: STALE` - показана устаревшая версия, идет регенерация

### 6. Тестирование API ревалидации

```bash
# Создайте пост
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test content"}'

# Ревалидируйте кеш
curl http://localhost:3000/api/revalidate?tag=posts

# Проверьте, что страница обновилась
curl http://localhost:3000/blog
```

---

## Лучшие практики

### 1. Выбор правильной стратегии

```tsx
// ✅ SSG - для статического контента
// app/about/page.tsx
export default function AboutPage() {
  return <div>О нас</div>
}

// ✅ ISR - для периодически обновляемого контента
// app/blog/page.tsx
export const revalidate = 3600
export default async function BlogPage() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}

// ✅ SSR - для персонализированного контента
// app/dashboard/page.tsx
export const dynamic = "force-dynamic"
export default async function DashboardPage() {
  const user = await getCurrentUser()
  return <Dashboard user={user} />
}
```

### 2. Используйте теги для гранулярной ревалидации

```tsx
// Тегируйте связанные данные
fetch("https://api.example.com/posts", {
  next: { tags: ["posts", "content"] },
})

fetch("https://api.example.com/posts/1", {
  next: { tags: ["posts", "post-1", "content"] },
})

// Ревалидируйте точечно
revalidateTag("post-1") // Только один пост
revalidateTag("posts") // Все посты
revalidateTag("content") // Весь контент
```

### 3. Комбинируйте стратегии

```tsx
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Детали товара - ISR (обновляются редко)
  const product = await fetch(`/api/products/${id}`, {
    next: { revalidate: 3600 },
  }).then((r) => r.json())

  // Наличие на складе - SSR (всегда актуально)
  const stock = await fetch(`/api/products/${id}/stock`, {
    cache: "no-store",
  }).then((r) => r.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>В наличии: {stock.quantity}</p>
    </div>
  )
}
```

### 4. Обработка ошибок при ревалидации

```tsx
export const revalidate = 60

export default async function Page() {
  try {
    const data = await fetch("https://api.example.com/data")

    if (!data.ok) {
      // Бросаем ошибку, чтобы сохранить старую версию страницы
      throw new Error(`Failed to fetch: ${data.status}`)
    }

    const result = await data.json()
    return <div>{JSON.stringify(result)}</div>
  } catch (error) {
    // Next.js сохранит последнюю успешную версию
    console.error("Revalidation failed:", error)
    throw error
  }
}
```

### 5. Оптимизация производительности

```tsx
// ❌ Плохо - все данные с SSR
export const dynamic = "force-dynamic"

export default async function Page() {
  const staticData = await fetch("/api/static")
  const dynamicData = await fetch("/api/dynamic")
  return <div>...</div>
}

// ✅ Хорошо - разделяем стратегии
export default async function Page() {
  // Статические данные с ISR
  const staticData = await fetch("/api/static", {
    next: { revalidate: 3600 },
  })

  // Динамические данные с SSR
  const dynamicData = await fetch("/api/dynamic", {
    cache: "no-store",
  })

  return <div>...</div>
}
```

### 6. Используйте правильные значения revalidate

```tsx
// Очень редко меняющийся контент
export const revalidate = 86400 // 24 часа

// Часто обновляемый контент
export const revalidate = 60 // 1 минута

// Критически важная актуальность
export const revalidate = 10 // 10 секунд

// Статический контент (без ревалидации)
export const revalidate = false
```

### 7. Безопасность API ревалидации

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Проверка секретного токена
  const authHeader = request.headers.get("authorization")

  if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { tag } = body

  if (!tag) {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 })
  }

  try {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
```

### 8. Мониторинг и логирование

```tsx
// lib/logger.ts
export function logCacheStatus(url: string, status: "HIT" | "MISS" | "STALE") {
  console.log(`[Cache ${status}] ${url} at ${new Date().toISOString()}`)
}

// В компоненте
export default async function Page() {
  const startTime = Date.now()
  const data = await fetch("https://api.example.com/data")
  const duration = Date.now() - startTime

  console.log(`Data fetched in ${duration}ms`)

  return <div>...</div>
}
```

---

## Сравнительная таблица

| Характеристика          | SSG                 | ISR                         | SSR                  |
| ----------------------- | ------------------- | --------------------------- | -------------------- |
| **Скорость загрузки**   | ⚡⚡⚡ Мгновенно    | ⚡⚡⚡ Мгновенно            | ⚡⚡ Быстро          |
| **Актуальность данных** | ❌ Устаревают       | ✅ Периодически обновляются | ✅ Всегда свежие     |
| **Нагрузка на сервер**  | ✅ Минимальная      | ✅ Низкая                   | ❌ Высокая           |
| **SEO**                 | ✅ Отлично          | ✅ Отлично                  | ✅ Отлично           |
| **Персонализация**      | ❌ Нет              | ❌ Нет                      | ✅ Да                |
| **Когда использовать**  | Статический контент | Периодически обновляемый    | Персональный контент |

---

## Заключение

### Основные выводы

1. **SSG** - используйте для статического контента (о компании, условия использования)
2. **ISR** - лучший выбор для большинства динамических страниц (блоги, каталоги)
3. **SSR** - только для персонализированного или критически важного контента
4. **Комбинируйте** стратегии на одной странице для оптимальной производительности

### Чек-лист перед деплоем

- [ ] Проверьте вывод `npm run build` на правильные типы страниц
- [ ] Протестируйте в production режиме (`npm start`)
- [ ] Убедитесь, что ISR работает (проверьте временные метки)
- [ ] Настройте безопасность для API ревалидации
- [ ] Добавьте мониторинг кеша
- [ ] Документируйте стратегии кеширования для команды

### Полезные ссылки

- [Официальная документация Next.js](https://nextjs.org/docs)
- [Руководство по кешированию](https://nextjs.org/docs/app/building-your-application/caching)
- [ISR документация](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
