# Routing について
**ルーティング**とは、アプリケーションが特定のエンドポイントに対するクライアント要求に応答する方法として、URI (またはパス) と特定の HTTP 要求メソッド (GET、POST など) を決定すること。

各ルートには、1 つ以上のハンドラー関数があり、それらはルートが一致したときに実行される。
### 構造
> app.METHOD(PATH, HANDLER)
- app: express のインスタンス
- METHOD: HTTP 要求メソッド
- PATH: サーバー上のパス
- HANDLER: ルートが一致したときに実行される関数

## ルートの定義
ホーム・ページで Hello World! と応答。
```js
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```
アプリケーションのtopページであるルートのルート (/) で POST 要求に応答。
```js
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
```
/user ルートに対する PUT 要求に応答。
```js
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```
/user ルートに対する DELETE 要求に応答。
```js
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```