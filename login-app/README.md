# ログインページを作る
必要なミドルウェア
- [Session](https://expressjs.com/en/resources/middleware/session.html): セッションを扱うミドルウェア。cookieは内部的に処理される。
- bodyParser: フォームの送信データを処理

## ミドルウェアのインストール
- セッション
ターミナルでコマンド入力
```
npm install express-session
```
API
```js
var session = require('express-session')
```

```
npm install --save body-parser
```
[form](https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm)

***

# Cookie と LocalStorage と SessionStorage の違い
| 比較 | Cookies | LocalStorage | SessionStorage |
| --- | --- | --- | --- |
| 容量 | 4kb | 10mb | 5mb |
| 有効期限 | マニュアル | なし | タブを閉じたら |
| 保存場所 | ブラウザかサーバー | ブラウザーのみ | ブラウザーのみ |

## Cookie
```js
// クッキーの保存
document.cookie = 'name=Kyle'
// クッキーの有効期限を設定して保存（ブラウザを閉じてもcookieを残す)
document.cookie = 'name=shiori; expires=' + new Date(9999, 0, 1).toUTCString()
document.cookie = "user=John; max-age=3600"; // 1時間後（秒でカウント）
// クッキーの削除
document.cookie = "name=; expires=0";
```

## LocalStorage と SessionStorage
- `setItem(key, value)` – key/value ペアを格納する.
- `getItem(key)` – key を元に value を取得する
- `removeItem(key)` – 指定された key (valueも) を削除する
- `clear()` – すべてを削除する
- `key(index)` – 指定位置の key を取得する
- `length` – 格納されたアイテムの長さ

### 使用例
```js
// ローカルストレージの保存
localStorage.setItem('name', 'shiori');
// ローカルストレージの削除
localStorage.removeItem('name');


// セッションの保存
sessionStorage.setItem('name', 'shiori');
// セッションの上書き
sessionStorage.setItem('name', 'yukari');
// セッションの削除
sessionStorage.removeItem('name');
```

 Reference: 
[Cookies](https://ja.javascript.info/cookie),   
[LocalStorage,SessionStorage](https://ja.javascript.info/localstorage),   
[JavaScript Cookies vs Local Storage vs Session](https://www.youtube.com/watch?v=GihQAC1I39Q)