/**
 * Приймає відповіді з index.html і дописує їх рядком у цю Google-таблицю.
 * Вставте цей код у: Таблиця → Розширення → Apps Script, і розгорніть як Web app
 * (Execute as: Me, Who has access: Anyone). Інструкція — у README.md.
 */

var SHEET_NAME = 'Відповіді';

// Порядок колонок: [назва поля у формі, заголовок у таблиці]
var BOOKS = [
  ['rating_ne_ozyraisia_i_myvchy', 'Не озирайся і мовчи'],
  ['rating_teatr', 'Театр'],
  ['rating_akvareli', 'Акварелі'],
  ['rating_orlando', 'Орландо'],
  ['rating_kinoteatr_kosmos', 'Кінотеатр «Космос»']
];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Honeypot: людина це поле не бачить, боти заповнюють
  if (p['bot-field']) return json_({ ok: true });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet_();
    var row = [new Date(), String(p.nick || '').trim().slice(0, 200)];
    BOOKS.forEach(function (b) {
      var v = parseFloat(p[b[0]]);
      row.push(isFinite(v) && v >= 1 && v <= 10 ? Math.round(v * 10) / 10 : '');
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Відкрийте URL веб-застосунку в браузері — має показати {"ok":true,"ping":true}
function doGet() {
  return json_({ ok: true, ping: true });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Час', 'Нік'].concat(BOOKS.map(function (b) { return b[1]; })));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, BOOKS.length + 2).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
