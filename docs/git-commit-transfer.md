# Git: Перенос коммитов между ветками

## Проблема

Вы сделали коммит в неправильной ветке (например, в `dev`), но еще не запушили его. Нужно перенести этот коммит в другую ветку и откатить исходную ветку.

## Решение

### Шаг 1: Проверка текущего состояния

Перед любыми операциями убедитесь, что:

- Вы находитесь в нужной ветке
- Рабочее дерево чистое (нет незакоммиченных изменений)
- Знаете SHA коммита, который нужно перенести

```bash
# Проверить текущую ветку
git rev-parse --abbrev-ref HEAD

# Проверить статус (должно быть пусто)
git status --porcelain

# Посмотреть последний коммит
git log -n 1 --oneline
```

### Шаг 2: Перенос коммита через cherry-pick

**Cherry-pick** — это команда, которая копирует коммит из одной ветки в другую.

```bash
# Переключиться на целевую ветку
git switch <target-branch>

# Перенести коммит по его SHA
git cherry-pick <commit-sha>
```

**Пример:**

```bash
git switch INCTA-27
git cherry-pick 040d6f740b7d5234baaefd8850b90a1e621237a0
```

### Шаг 3: Откат исходной ветки

После успешного переноса нужно откатить исходную ветку на один коммит назад.

```bash
# Вернуться на исходную ветку
git switch <source-branch>

# Откатить на один коммит назад
git reset --hard HEAD~1
```

**Пример:**

```bash
git switch dev
git reset --hard HEAD~1
```

## Подробнее о командах

### `git cherry-pick <commit-sha>`

- **Что делает**: Копирует указанный коммит в текущую ветку
- **Когда использовать**: Когда нужно перенести конкретные коммиты между ветками
- **Важно**: Создает новый коммит с новым SHA, но с тем же содержимым

### `git reset --hard HEAD~1`

- **Что делает**: Откатывает ветку на один коммит назад
- **`--hard`**: Полностью удаляет изменения из рабочего дерева
- **`HEAD~1`**: Означает "на один коммит назад от HEAD"
- **`HEAD~N`**: Можно откатить на N коммитов назад

### Альтернативы `--hard`:

```bash
# Оставить изменения в staged (готовы к коммиту)
git reset --soft HEAD~1

# Оставить изменения в unstaged (не готовы к коммиту)
git reset HEAD~1
# или
git reset --mixed HEAD~1
```

## Полный пример из практики

### Исходная ситуация:

- Вы в ветке `dev`
- Сделали коммит `040d6f7` с сообщением "INCTA-36: fix(delete): old tests"
- Коммит не запушен
- Нужно перенести в ветку `INCTA-27`

### Решение:

```bash
# 1. Проверяем текущее состояние
git status --porcelain                    # Убедились, что чисто
git log -n 1 --pretty=format:%H%n%s      # Получили SHA и сообщение

# 2. Проверяем, что целевая ветка существует
git branch --list INCTA-27               # Ветка существует

# 3. Переносим коммит
git switch INCTA-27
git cherry-pick 040d6f740b7d5234baaefd8850b90a1e621237a0

# 4. Откатываем dev
git switch dev
git reset --hard HEAD~1

# 5. Проверяем результат
git switch INCTA-27
git log -n 1 --oneline                   # Коммит есть в INCTA-27

git switch dev
git log -n 1 --oneline                   # Коммита нет в dev
```

## Дополнительные сценарии

### Перенос нескольких коммитов

```bash
# Перенести последние 3 коммита
git switch target-branch
git cherry-pick HEAD~3..HEAD

# Или по одному
git cherry-pick <sha1>
git cherry-pick <sha2>
git cherry-pick <sha3>

# Откатить исходную ветку на 3 коммита
git switch source-branch
git reset --hard HEAD~3
```

### Создание новой ветки с текущим коммитом

Если целевой ветки еще не существует:

```bash
# Создать новую ветку на текущем коммите
git switch -c new-feature-branch

# Вернуться и откатить старую ветку
git switch dev
git reset --hard HEAD~1
```

### Безопасность: создание бэкапа

Перед откатом можно создать бэкап-ветку:

```bash
# Создать бэкап текущего состояния dev
git branch backup/dev-before-reset dev

# Теперь можно безопасно откатывать
git reset --hard HEAD~1

# Если что-то пошло не так, восстановить:
git reset --hard backup/dev-before-reset
```

## Частые ошибки и их решение

### Ошибка: "Your local changes would be overwritten"

**Причина**: У вас есть незакоммиченные изменения.

**Решение**:

```bash
# Сохранить изменения во временное хранилище
git stash

# Выполнить операции переноса
# ...

# Вернуть изменения
git stash pop
```

### Ошибка: Конфликт при cherry-pick

**Причина**: Коммит конфликтует с текущим состоянием целевой ветки.

**Решение**:

```bash
# Git покажет конфликтующие файлы
# Разрешите конфликты вручную в редакторе

# После разрешения конфликтов:
git add <resolved-files>
git cherry-pick --continue

# Или отменить cherry-pick:
git cherry-pick --abort
```

### Ошибка: Случайно откатили не ту ветку

**Решение**:

```bash
# Найти потерянный коммит в reflog
git reflog

# Восстановить ветку на нужный коммит
git reset --hard <sha-from-reflog>
```

## Проверка результата

После всех операций проверьте:

```bash
# Коммит есть в целевой ветке
git switch target-branch
git log --oneline -n 5

# Коммита нет в исходной ветке
git switch source-branch
git log --oneline -n 5

# Рабочее дерево чистое
git status
```

## Когда пушить изменения

**Важно**: Не пушьте сразу после отката, если не уверены в результате.

```bash
# Сначала проверьте локально
git log --oneline --graph --all -n 10

# Если всё правильно, пушьте:
git push origin target-branch
git push origin source-branch

# Если откатили ветку, которая уже была запушена:
git push --force-with-lease origin source-branch
```

⚠️ **Внимание**: `--force-with-lease` перезаписывает историю на удаленном репозитории. Используйте только если уверены, что никто другой не работает с этой веткой.

## Полезные команды для диагностики

```bash
# Посмотреть историю всех веток
git log --oneline --graph --all -n 20

# Найти коммит по сообщению
git log --all --grep="INCTA-36"

# Посмотреть, в каких ветках есть коммит
git branch --contains <commit-sha>

# Посмотреть разницу между ветками
git log dev..INCTA-27 --oneline

# История всех операций (включая откаты)
git reflog
```

## Резюме

1. **Проверьте** текущее состояние и получите SHA коммита
2. **Переключитесь** на целевую ветку: `git switch target-branch`
3. **Перенесите** коммит: `git cherry-pick <sha>`
4. **Вернитесь** на исходную ветку: `git switch source-branch`
5. **Откатите** ветку: `git reset --hard HEAD~1`
6. **Проверьте** результат в обеих ветках
7. **Запушьте** изменения, когда будете уверены

## Дополнительные ресурсы

- [Git Documentation - cherry-pick](https://git-scm.com/docs/git-cherry-pick)
- [Git Documentation - reset](https://git-scm.com/docs/git-reset)
- [Git Documentation - reflog](https://git-scm.com/docs/git-reflog)
