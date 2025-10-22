📦 Что такое widgets/ в FSD?
**widgets** — это слой визуальных компонентов, которые объединяют несколько фич (features), сущностей (entities)
и UI-элементов (shared) в одно логическое "виджетное" представление.

Проще говоря:
widgets = смысловой блок страницы, состоящий из уже готовых частей, собранных
в нечто, что можно переиспользовать в разных страницах.

Пример распределения по структуре
/app
  layout.tsx                   ← Глобальный layout
  page.tsx                     ← Главная страница
  /auth
    /login
      page.tsx                 ← Страница входа, собирает LoginFormWidget
    /registration
      page.tsx                 ← Страница регистрации, собирает RegisterFormWidget или EmailStatusWidget

/shared
  /ui
    Input.tsx
    Button.tsx
    Typography.tsx             ← Заголовки, текст
  /lib
    classNames.ts
  /assets
    email-confirmed.svg
    link-expired.svg
    github-icon.png
    google-icon.png

/entities
  /user
    model/
      userSlice.ts             ← Redux/Zustand для авторизации
    index.ts                   ← Реэкспорты

/features
  /auth
    /login
      model/
        useLoginForm.ts        ← Хук логики входа
      ui/
        LoginFields.tsx        ← Поля формы входа
    /register
      model/
        useRegisterForm.ts     ← Хук логики регистрации
        useEmailConfirmation.ts← Подтверждение email
      ui/
        RegisterFields.tsx     ← Поля регистрации
        ResendLinkForm.tsx     ← Форма повтора письма

/widgets
  /login-form
    ui/
      LoginFormWidget.tsx      ← Комбинирует LoginFields + кнопки
    index.ts
  /register-form
    ui/
      RegisterFormWidget.tsx   ← Комбинирует RegisterFields + submit
    index.ts
  /email-status
    ui/
      EmailStatusWidget.tsx    ← Отображает info-блок после подтверждения / ошибки
    index.ts
  /modal
    ui/
      ModalWindowWidget.tsx    ← Уведомление после регистрации
    index.ts

