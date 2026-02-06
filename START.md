# Инструкция по запуску проекта

## Самый простой способ: npm start

```bash
cd /Users/timur/Desktop/colletral
npm start
```

Сервер запустится на **http://localhost:3000** — откройте этот адрес в браузере.

(При первом запуске `npx` может скачать пакет `serve` — это нормально.)

---

## Другие способы

### С автообновлением страницы (live-server)

```bash
npm run dev
```

Страница будет перезагружаться при изменении файлов.

### Python 3

```bash
cd /Users/timur/Desktop/colletral
python3 -m http.server 8000
```

Откройте: **http://localhost:8000**

### PHP

```bash
cd /Users/timur/Desktop/colletral
php -S localhost:8000
```

## Остановка сервера

Нажмите **Ctrl+C** в терминале.
