# 📚 Учебный гид: SSR, ISR и гидратация в приложении

## Учебный гид по стратегиям рендеринга

---

## **1. ISR (Incremental Static Regeneration) — Основа главной страницы**

### 🎯 **Что это простыми словами?**

Представьте, что вы печете торт (HTML страницу):
- **SSG** — испекли торт один раз при сборке проекта
- **ISR** — торт испекли заранее, но через 60 секунд печете новый, если кто-то захочет свежий

### 📄 **Реализация в `app/page.tsx`**

```typescript
// Включаем ISR с ревалидацией каждые 60 секунд
export const revalidate = 60
```

**Что происходит:**

1. **При сборке** (`npm run build`):
   ```
   ┌ ○ /    866 B    185 kB    1m    1y
   ```
   - Next.js делает запросы к API
   - Получает данные (посты и счетчик)
   - Генерирует готовый HTML-файл
   - Сохраняет его на диск

2. **При первом запросе пользователя**:
   - Сервер отдает готовый HTML (мгновенно!)
   - Пользователь видит страницу за миллисекунды

3. **Через 60+ секунд при новом запросе**:
   - Сервер отдает старый HTML (быстро)
   - **В фоне** запускает регенерацию:
     ```typescript
     const [totalCountData, postsData] = await Promise.all([
       getTotalUsersCount().catch(() => ({ totalCount: 0 })),
       getLatestPosts().catch(() => ({ items: [], pageSize: 4, totalCount: 0 })),
     ])
     ```
   - Следующий пользователь получит уже новый HTML

---

## **2. Server Actions — Получение данных на сервере**

### 📄 **Реализация в `app/lib/serverActions.ts`**

```typescript
export async function getTotalUsersCount(): Promise<TotalCountResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`, {
    next: { revalidate: 60, tags: ["users-count"] },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch users count: ${res.status}`)
  }

  return res.json()
}
```

**Детали:**

```typescript
next: { revalidate: 60, tags: ["users-count"] }
```

- **`revalidate: 60`** — кэшировать ответ на 60 секунд
- **`tags: ["users-count"]`** — пометить кэш тегом для выборочной очистки

**Зачем это нужно?**

Если вы используете On-Demand Revalidation:
```bash
curl "http://localhost:3000/api/revalidate?secret=TOKEN&tag=users-count"
```
Очистится только кэш с тегом `users-count`, а не все данные!

---

## **3. Разделение Server и Client компонентов**

### 🖥️ **Server Component: `MainPhotos.tsx`**

```typescript
/**
 * Серверный компонент для отображения последних постов на главной странице
 * Данные получаются через ISR на сервере
 */
export const MainPhotos = ({ initialPosts }: MainPhotosProps) => {
```

**Что делает:**
- Получает данные как props (уже с сервера)
- Рендерит HTML
- **Никакого JavaScript на клиенте** для этого компонента!

**Результат в HTML:**
```html
<div class="container">
  <div class="grid">
    <div class="card" data-post-id="123">
      <img src="...">
      <div class="userInfo">...</div>
    </div>
  </div>
</div>
```

Пользователь видит это **мгновенно**, даже без JavaScript!

---

### 💻 **Client Component: `MainPhotosClient.tsx`**

```typescript
"use client"

import { useState, ReactNode } from "react"
import { PostModal } from "@/features/posts/ui/PostModal"

type MainPhotosClientProps = {
  children: ReactNode
}

/**
 * Клиентская обёртка для MainPhotos
 * Управляет состоянием модального окна и обработкой кликов
 */
export function MainPhotosClient({ children }: MainPhotosClientProps) {
```

**Что делает:**
- Добавляет **интерактивность** (клики, модалки)
- Управляет **состоянием** (useState)
- Работает **только в браузере**

---

## **4. Гидратация (Hydration) — Оживление статики**

### 🌊 **Что это?**

**Гидратация** — процесс "оживления" статического HTML с помощью JavaScript.

**Процесс:**

1. **Сервер отправляет HTML** (статический контент):
   ```html
   <div>
     <h2>Всего пользователей: 1234</h2>
     <div class="grid">
       <!-- 4 поста -->
     </div>
   </div>
   ```

2. **Браузер показывает HTML** (пользователь видит контент)

3. **Браузер загружает JavaScript** (chunks из билда):
   ```
   chunks/255-40634877ae3e8e9d.js  45.7 kB
   chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
   ```

4. **React "гидратирует" страницу**:
   - Прикрепляет обработчики событий
   - Инициализирует состояние
   - Делает страницу интерактивной

5. **Теперь можно кликать** на посты, открывать модалки!

---

## **5. Клиентская проверка авторизации**

### 📄 **Реализация в `ClientAuthWrapper.tsx`**

```typescript
export function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  const { data: user, isError, isLoading } = useMeQuery()

  // Показываем лоадер только для проверки авторизации
  // Публичный контент уже отрендерен на сервере
  if (isLoading) {
    return (
      <div style={{ padding: "20px", color: "var(--color-light-100)" }}>
        <div>Проверка авторизации...</div>
        {children}
      </div>
    )
  }
```

**Что происходит:**

### **Этап 1: Сервер рендерит**
```typescript
export default async function Home() {
  // Получаем данные на сервере с ISR
  const [totalCountData, postsData] = await Promise.all([
    getTotalUsersCount().catch(() => ({ totalCount: 0 })),
    getLatestPosts().catch(() => ({ items: [], pageSize: 4, totalCount: 0 })),
  ])

  const totalCount = totalCountData.totalCount

  return (
    <ClientAuthWrapper>
      <h2 style={{ color: "var(--color-light-100)" }}>Всего пользователей зарегистрировано: {totalCount}</h2>
      <MainPhotos initialPosts={postsData} />
    </ClientAuthWrapper>
  )
}
```

**HTML отправлен:**
```html
<div>
  <h2>Всего пользователей: 1234</h2>
  <div class="grid"><!-- посты --></div>
</div>
```

### **Этап 2: Браузер делает `/me` запрос**

```typescript
const { data: user, isError, isLoading } = useMeQuery()
```

Это вызывает:
```typescript
// Где-то в authApi.ts
export const authApi = createApi({
  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => '/auth/me',
    }),
  }),
})
```

### **Этап 3: Условный рендеринг**

```typescript
const isLoggedIn = !!user && !isError

return (
  <div style={{}}>
    {isLoggedIn && <Sidebar />}
    <div style={{ padding: "20px", margin: "0 auto" }}>{children}</div>
  </div>
)
```

**Результат:**
- Если **авторизован** → показываем `<Sidebar />`
- Если **не авторизован** → только контент

---

## **6. On-Demand Revalidation — Ручное обновление**

### 📄 **Реализация в `app/api/revalidate/route.ts`**

```typescript
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get("secret")
  const path = searchParams.get("path") || "/"
  const tag = searchParams.get("tag")

  // Проверяем секретный токен
  if (secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
```

**Как использовать:**

### **Вариант 1: Обновить весь путь**
```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_TOKEN&path=/"
```
→ Обновит всю главную страницу

### **Вариант 2: Обновить по тегу**
```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_TOKEN&tag=latest-posts"
```
→ Обновит только посты, не трогая счетчик пользователей

**Когда это полезно:**
- Новый пост создан → вызываем revalidate
- Пользователь зарегистрирован → обновляем счетчик
- Не ждем 60 секунд!

---

## **📊 Оценка реализации**

### ✅ **Что сделано отлично:**

1. **ISR настроен правильно** (⭐⭐⭐⭐⭐)
   - `export const revalidate = 60` — идеально для UC
   - Баланс между свежестью и производительностью

2. **Разделение Server/Client** (⭐⭐⭐⭐⭐)
   - `MainPhotos` — серверный (статика)
   - `MainPhotosClient` — клиентский (интерактивность)
   - Минимум JavaScript на клиенте

3. **Клиентская авторизация** (⭐⭐⭐⭐⭐)
   - `/me` запрос на клиенте
   - Публичный контент доступен сразу
   - Соответствует UC требованиям

4. **Теги для кэша** (⭐⭐⭐⭐⭐)
   ```typescript
   next: { revalidate: 60, tags: ["users-count"] }
   ```
   - Гранулярный контроль над кэшем
   - Продвинутая техника!

5. **On-Demand Revalidation** (⭐⭐⭐⭐⭐)
   - Бонусная фича
   - Позволяет обновлять контент мгновенно

### ⚠️ **Что можно улучшить:**

1. **Loading states** (⭐⭐⭐)
   ```typescript
   if (isLoading) {
     return (
       <div style={{ padding: "20px", color: "var(--color-light-100)" }}>
         <div>Проверка авторизации...</div>
         {children}
       </div>
     )
   }
   ```
   → Можно добавить красивый скелетон вместо текста

2. **Error handling**
   - Есть `.catch()`, но пользователь не увидит ошибку
   - Можно добавить fallback UI

3. **Мониторинг ISR**
   - Добавить логирование регенераций
   - Отслеживать время обновления

---

## **🎓 Итоговая оценка: 9.5/10**

**Сильные стороны:**
- ✅ Архитектура соответствует лучшим практикам Next.js 14
- ✅ Правильное использование ISR
- ✅ Оптимальное разделение Server/Client
- ✅ SEO-friendly (статический HTML)
- ✅ Быстрая загрузка (185 kB First Load JS)

**Область для роста:**
- Визуальные индикаторы загрузки
- Более детальная обработка ошибок

**Вывод:** Реализация UC-1 — **production-ready** и демонстрирует глубокое понимание современных паттернов Next.js! 🚀

---

## **📝 Чек-лист проверки UC-1**

### 1. **Страница доступна по адресу "/"** ✅
- Файл: `app/page.tsx` 
- Страница существует и доступна

### 2. **ISR с ревалидацией каждую минуту** ✅
```typescript
export const revalidate = 60
```
- Настроен ISR с обновлением контента каждые 60 секунд

### 3. **Серверный рендеринг публичного контента** ✅
```typescript
export default async function Home() {
  // Получаем данные на сервере с ISR
  const [totalCountData, postsData] = await Promise.all([
    getTotalUsersCount().catch(() => ({ totalCount: 0 })),
    getLatestPosts().catch(() => ({ items: [], pageSize: 4, totalCount: 0 })),
  ])
```
- ✅ Количество пользователей и 4 последних поста загружаются на сервере
- ✅ Контент рендерится до отправки клиенту

### 4. **Клиентская проверка авторизации** ✅
```typescript
const { data: user, isError, isLoading } = useMeQuery()
```
- ✅ `/me` запрос выполняется на клиенте
- ✅ Публичный контент показывается сразу, даже во время проверки авторизации

### 5. **Header для авторизованных/неавторизованных** ✅
```typescript
!isLoggedIn && (
  <div className={s.menuButton}>
    <Button as={"a"} href={PATH.AUTH.LOGIN}>Log in</Button>
    <Button as={"a"} href={PATH.AUTH.REGISTRATION}>Sign up</Button>
  </div>
)
```
- ✅ Для неавторизованных: кнопки [Log In] и [Sign Up]
- ✅ Для авторизованных: dropdown меню

### 6. **Sidebar для авторизованных** ✅
```typescript
return (
  <div style={{}}>
    {isLoggedIn && <Sidebar />}
    <div style={{ padding: "20px", margin: "0 auto" }}>{children}</div>
  </div>
)
```
- ✅ Sidebar показывается только для авторизованных пользователей

### 7. **On-Demand Revalidation (опционально)** ✅
- Файл: `app/api/revalidate/route.ts`
- ✅ Реализован endpoint для принудительной ревалидации

---

## **🧪 Как тестировать:**

### **Тест 1: Неавторизованный пользователь**
```bash
# Откройте браузер в режиме инкогнито
# Перейдите на http://localhost:3000/
```
**Ожидаемый результат:**
- ✅ Видно количество пользователей
- ✅ Видно 4 последних поста
- ✅ В header кнопки "Log in" и "Sign up"
- ✅ Нет sidebar

### **Тест 2: Авторизованный пользователь**
```bash
# Авторизуйтесь в приложении
# Перейдите на http://localhost:3000/
```
**Ожидаемый результат:**
- ✅ Видно количество пользователей
- ✅ Видно 4 последних поста
- ✅ Есть sidebar с навигацией
- ✅ В header dropdown меню вместо кнопок входа

### **Тест 3: ISR работает**
```bash
# В консоли разработчика (Network tab)
# Первый визит - полная загрузка
# Обновите страницу (F5) - должна отдаться из кэша
# Подождите 60+ секунд - контент должен обновиться
```

### **Тест 4: On-Demand Revalidation (опционально)**
```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_SECRET_TOKEN"
```
**Должен вернуть:**
```json
{
  "revalidated": true,
  "type": "path",
  "path": "/",
  "now": 1729350000000
}
```

### **Тест 5: SSR работает правильно**
```bash
# View Page Source (Ctrl+U в браузере)
# Должны увидеть готовый HTML с постами и счетчиком
```

---

## **📊 Проверка в билде**

Вывод билда:
```
┌ ○ /    866 B    185 kB    1m    1y
```
- ✅ **○ (Static)** - страница статически предрендерена
- ✅ **Revalidate: 1m** - ISR с ревалидацией каждую минуту
- ✅ **Expire: 1y** - кэш на год

---

## **✅ Итоговый вердикт**

**UC-1 выполнен** 

Все требования соблюдены:
- ✅ ISR с ревалидацией каждую минуту
- ✅ Публичный контент рендерится на сервере
- ✅ Авторизация проверяется на клиенте (`/me` запрос)
- ✅ Header и Sidebar адаптируются под статус авторизации
- ✅ Показывается 4 последних поста и количество пользователей
- ✅ (Бонус) Реализован On-Demand Revalidation

