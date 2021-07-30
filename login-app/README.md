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