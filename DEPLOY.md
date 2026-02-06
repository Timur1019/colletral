# Инструкция по размещению на GitHub

## Шаг 1: Создание репозитория на GitHub

1. Зайдите на [GitHub.com](https://github.com) и войдите в аккаунт
2. Нажмите кнопку **"New"** (или **"+"** → **"New repository"**)
3. Заполните:
   - **Repository name**: `colletral` (или любое другое имя)
   - **Description**: "Corporative Dashboard Application"
   - Выберите **Public** (или Private, если нужен приватный репозиторий)
   - **НЕ** ставьте галочки на "Add README", "Add .gitignore", "Choose a license" (они уже есть)
4. Нажмите **"Create repository"**

## Шаг 2: Инициализация Git в проекте

Откройте терминал в папке проекта и выполните:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Corporative Dashboard Application"

# Добавление remote репозитория (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/https://github.com/Timur1019/colletral.git/colletral.git

# Переименование ветки в main (если нужно)
git branch -M main

# Отправка кода на GitHub
git push -u origin main
```

## Шаг 3: Размещение на GitHub Pages (бесплатный хостинг)

1. Зайдите в ваш репозиторий на GitHub
2. Перейдите в **Settings** (настройки)
3. В левом меню найдите **Pages**
4. В разделе **Source** выберите:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Нажмите **Save**
6. Через несколько минут ваш сайт будет доступен по адресу:
   ```
   https://YOUR_USERNAME.github.io/colletral/
   ```

## Альтернативные варианты размещения

### Netlify (рекомендуется)
1. Зайдите на [netlify.com](https://www.netlify.com)
2. Зарегистрируйтесь/войдите через GitHub
3. Нажмите **"Add new site"** → **"Import an existing project"**
4. Выберите ваш репозиторий
5. Настройки:
   - **Build command**: (оставьте пустым)
   - **Publish directory**: `/` (root)
6. Нажмите **"Deploy site"**

### Vercel
1. Зайдите на [vercel.com](https://vercel.com)
2. Зарегистрируйтесь через GitHub
3. Нажмите **"Add New Project"**
4. Импортируйте ваш репозиторий
5. Нажмите **"Deploy"**

### Render.com
1. Зайдите на [render.com](https://render.com) и подключите репозиторий GitHub.
2. Создайте **Static Site**, выберите репозиторий `colletral`.
3. **Обязательно** в разделе **Settings → Build & Deploy** укажите:
   - **Build command:** `echo 'No build step'` (или пусто).
   - **Publish directory:** введите одну точку **`.`** (корень репозитория). Не указывайте `new`, `render`, `public` или `dist` — их в проекте нет, будет ошибка *"Publish directory ... does not exist!"*.
4. Сохраните настройки и запустите **Manual Deploy**.
5. В корне репо есть `render.yaml` с `staticPublishPath: .` — если создаёте сайт через **Blueprint** (Infrastructure as Code), эти настройки подхватятся автоматически.

## Обновление сайта

После внесения изменений:

```bash
# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push
```

GitHub Pages автоматически обновится через несколько минут.

## Полезные команды Git

```bash
# Проверить статус
git status

# Посмотреть историю коммитов
git log

# Отменить изменения в файле
git checkout -- filename

# Создать новую ветку
git checkout -b feature-name

# Переключиться на ветку
git checkout branch-name
```

