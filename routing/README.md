# Routing について
**ルーティング**とは、アプリケーションが特定のエンドポイントに対するクライアント要求に応答する方法として、URI (またはパス) と特定の HTTP 要求メソッド (GET、POST など) を決定すること。
ルーティングメソッドは、アプリケーションが指定されたルート（エンドポイント）とHTTPメソッドへのリクエストを受け取ったときに呼び出されるコールバック関数（ハンドラ関数とも呼ばれます）を指定する。

各ルートには、1 つ以上のハンドラー関数があり、それらはルートが一致したときに実行される。

# 概要
構造
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

# ルーティングの使い方
## 基本のルート
URLオブジェクトで、URLのデータをパース処理（データを解析して本来の状態に組み立て直す）する。
これによってドメイン化のパス部分の値をチェックし、それに応じて処理を分岐する。
```js
const url = require('url');

var url_parts = url.parse(request.url);
switch(url_parts.pathname) {
  case "/":
    "/"にアクセスした時の処理
    break;
}
```
- [app.all()](http://expressjs.com/ja/4x/api.html#app.all): 全てのHTTPメソッドを制御する
- [app.use()](http://expressjs.com/ja/4x/api.html#app.use): ミドルウェアを指定する

## Express版・基本のルート
```js
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
```

## route メソッド
route メソッドは、いずれかの HTTP メソッドから派生され、express クラスのインスタンスに付加される。

アプリケーションのルートへの **GET メソッド**と **POST メソッド**に定義されたルートの例：
```js
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```
### app.all()
すべての HTTPリクエストメソッドのパスにミドルウェア関数をロードするために使用される特別なルーティングメソッド 
どのメソッドを使用するかどうかにかかわらず、”/secret”ルートへのリクエストに対して次のハンドラが実行されます。
```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

## ルート・パス
ルート・パスは、リクエストメソッドとの組み合わせにより、リクエストを実行できるエンドポイントを定義。
ストリング、ストリング・パターン、または正規表現にすることができる。

- リクエストをルートのルート / にマッチング
```js
app.get('/', function (req, res) {
  res.send('root')
})
```
- リクエストを /about にマッチング
```js
app.get('/about', function (req, res) {
  res.send('about')
})
```
- リクエストを /random.text にマッチング
```js
app.get('/random.text', function (req, res) {
  res.send('random.text')
})
```

次に、ストリング・パターンに基づくルート・パスの例

- acd および abcd をマッチング
```js
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
```
- abcd、abbcd、abbbcd などをマッチング
```js
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})
```
- abcd、abxcd、abRABDOMcd、ab123cd などをマッチング
```js
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})
```
- /abe および /abcde をマッチング
```js
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})
```

次に、正規表現に基づくルート・パスの例

- ルート名に「a」が含まれるすべてのものをマッチング
```js
app.get(/a/, function (req, res) {
  res.send('/a/')
})
```
- butterfly および dragonfly をマッチングしますが、butterflyman、dragonfly man などはマッチングしません。
```js
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```

## ルート・ハンドラー
リクエストを処理するために、ミドルウェアのように動作する複数のコールバック関数を指定できる。
ルート・ハンドラーの形式
1. 関数
2. 関数の配列
3. 両方の組み合わせ

- 単一のコールバック関数で 1 つのルートを処理
```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```
- 複数のコールバック関数で1つのルートを処理 (必ず、next オブジェクトを指定)
```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```
- コールバック関数の配列で 1 つのルートを処理
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```
- 独立した関数と、関数の配列の組み合わせで1つのルートを処理
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

## app.route()
`app.route()` を使用して、ルート・パスの連結可能なルート・ハンドラーを作成
パスは単一の場所で指定
```js
app.route('/book')
.get(function (req, res) {
  res.send('Get a random book')
})
.post(function (req, res) {
  res.send('Add a book')
})
.put(function (req, res) {
  res.send('Update the book')
})
```

## express.Router
モジュール式のマウント可能なルート・ハンドラーを作成するには、`express.Router` クラスを使用する。
Router インスタンスは、完全なミドルウェアおよびルーティング・システムで、「ミニアプリケーション」と呼ばれる。

1. ルーターをモジュールとして作成
2. その中にミドルウェア関数をロード
3. いくつかのルートを定義
4. ルート・モジュールをメインアプリケーションのパスにマウント

アプリケーション・ディレクトリーに次の内容で birds.js というルーター・ファイルを作成します。
```js
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```
次に、ルーター・モジュールをアプリケーションにロードします。
```js
var birds = require('./birds')
// ...
app.use('/birds', birds)
```
これで、アプリケーションは、/birds および /birds/about に対するリクエストを処理するほか、ルートに固有の timeLog ミドルウェア関数を呼び出すことができるようになる。