# Оцінка книжок

Сторінка-опитування (`index.html`), відповіді якої зберігаються в Google Таблицю через Google Apps Script (`apps-script/Code.gs`). Сервер і платні сервіси не потрібні.

## Налаштування (~5 хвилин, один раз)

### 1. Таблиця і скрипт
1. Створіть нову Google Таблицю (sheets.new).
2. **Розширення → Apps Script**.
3. Замініть весь код у `Code.gs` на вміст файлу [`apps-script/Code.gs`](apps-script/Code.gs), збережіть (💾).

### 2. Розгортання
1. **Deploy → New deployment** → ⚙️ → **Web app**.
2. *Execute as*: **Me**; *Who has access*: **Anyone**.
3. **Deploy** → дозвольте доступ (Google попередить «неперевірений застосунок» → *Advanced → Go to … (unsafe)* — це ваш власний скрипт).
4. Скопіюйте **Web app URL** (виду `https://script.google.com/macros/s/…/exec`).
   Перевірка: відкрийте його в браузері — має бути `{"ok":true,"ping":true}`.

### 3. Підключити сторінку
У `index.html` замініть рядок

```js
var SHEET_URL = 'PASTE_APPS_SCRIPT_URL_HERE';
```

на ваш URL.

### 4. GitHub Pages
**Settings → Pages → Build and deployment → Deploy from a branch** → оберіть гілку і папку `/ (root)`.
Посилання буде: `https://andrewreddish.github.io/olexandra-book-quiz/`.

> Pages для приватного репозиторію доступні лише з GitHub Pro — інакше зробіть репозиторій публічним.

## Що потрапляє в таблицю
Аркуш «Відповіді»: `Час | Нік | Не озирайся і мовчи | Театр | Акварелі | Орландо | Кінотеатр «Космос»`.
Якщо книжку не оцінили — клітинка порожня. Середні можна порахувати `=AVERAGE(C2:C)`.

## Якщо змінюєте Code.gs
**Deploy → Manage deployments → ✏️ → Version: New version → Deploy** — так URL лишиться тим самим.
