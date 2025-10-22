# ✅ Проверка удаления старых файлов

## Статус: ВСЕ УДАЛЕНО

### Git статус показывает перемещение (R = renamed):
```
R  app/hooks/useAppDispatch.ts → shared/lib/redux/useAppDispatch.ts
R  app/hooks/useAppSelector.ts → shared/lib/redux/useAppSelector.ts
R  app/hooks/useOutsideClick.tsx → shared/lib/hooks/useOutsideClick.tsx
R  app/utils/handleError.ts → shared/lib/api/handleError.ts
R  app/utils/isErrorWithMessages.ts → shared/lib/api/isErrorWithMessages.ts
R  app/model/appSlice.ts → shared/model/app/appSlice.ts
R  app/api/baseApi.ts → shared/api/baseApi.ts
R  app/api/baseQuery.ts → shared/api/baseQuery.ts
R  app/api/publicUserApi.ts → entities/user/api/publicUserApi.ts
```

### Текущая структура app/:
```
app/
├── api/
│   └── revalidate/       ✅ (Next.js API route)
├── auth/                 ✅ (страница)
├── profile/              ✅ (страница)
├── layout.tsx            ✅
├── page.tsx              ✅
├── providers/            ✅
├── store/                ✅
└── lib/                  ✅

❌ app/hooks/     - УДАЛЕНА
❌ app/utils/     - УДАЛЕНА
❌ app/model/     - УДАЛЕНА
```

### Новое расположение:
```
shared/
├── api/                  ✅ baseApi, baseQuery
├── lib/
│   ├── api/              ✅ handleError, isErrorWithMessages
│   ├── hooks/            ✅ useOutsideClick
│   └── redux/            ✅ useAppDispatch, useAppSelector
└── model/
    └── app/              ✅ appSlice

entities/
└── user/
    └── api/              ✅ publicUserApi
```

## 🔄 Если видите старые директории в IDE

### 1. Перезагрузите окно IDE:
- **VS Code/Cursor:** `Cmd+Shift+P` → "Developer: Reload Window"
- **WebStorm:** `File` → `Invalidate Caches / Restart`

### 2. Проверьте физическое наличие:
```bash
ls -la app/ | grep -E "hooks|utils|model"
# Должно быть пусто
```

### 3. Проверьте git:
```bash
git status --short | grep "D app/"
# Должны быть строки с D (deleted)
```

## ✅ Готово к коммиту

Все изменения в staging area:
```bash
git status
```

Коммитить:
```bash
git commit -F .commit-message.txt
```
