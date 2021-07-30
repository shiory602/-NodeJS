# Cookie を操作する
Node.jsでのCookieの取扱は以下の３つ
- Node標準でのCookieの取り扱い
- npmモジュール（node-cookie）でのCookieの取り扱い
- ExpressでのCookieの取り扱い

# Node標準
## 書き込み(SET)
Cookieの読み込みはブラウザにheaderを送る
```js
res.setHeader('Set-Cookie', ['cookieProp=cookieValue']);
```
## 読み込み(GET)
Cookieの取得はrequestオブジェクトのheaderからできる
```js
var cookie = req.headers.cookie;
```

# npmモジュール（node-cookie）
[cookie](https://www.npmjs.org/package/cookie)を使うパターン
## インストール方法
ターミナルで使いたいフォルダを開いて下記コマンドを入力
```
npm install cookie
```
## 書き込み(SET)
1. Cookieの呼び出し
2. 
```js
var cookie = require('cookie');
 
var serialized_cookie = cookie.serialize('cookieProp', 'cookieValue', {
        maxAge : 100 //有効期間を100秒に設定
      });
//ヘッダーとして設定: res.setHeader('Set-Cookie', serialized_cookie);
<span class="nx">res</span>
<span class="p">.</span>
<span class="nx">setHeader</span>
<span class="p">(</span>
<span class="s1">'Set-Cookie'</span>
<span class="p">,</span>
<span class="nx">serialized_cookie</span>
<span class="p">);</span>
```
## 読み込み(GET)
ヘッダーから取得したCookieを`parse`して特定のkeyを指定
```js
var value = cookie.parse(req.headers.cookie).cookieProp;
```

# Express
フレームワークであるExpressにはミドルウェアが標準搭載されている
```js
app.use(express.cookieParser());
```
## 書き込み(SET)
```js
res.cookie(<key>, <value>, {options});
```
## 読み込み(GET)
```js
var cookie = req.cookies.<key>
```

## Cookieの確認
1. デベロッパーツールのアプリケーションを開く
2. Storage の Cookies をクリック

***

[cookieを使ってみる](https://qiita.com/tarotaro1129/items/0e424f2f987914ab9ff4), 
[HTTP Cookie](https://www.infraexpert.com/study/tcpip16.6.html), 
[MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)
[document.cookie](https://developer.mozilla.org/ja/docs/Web/API/Document/cookie)