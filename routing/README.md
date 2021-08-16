# About Routing
**Routing** is the process by which an application determines a URI (or path) and a specific HTTP request method (GET, POST, etc.) as a way to respond to client requests for a particular endpoint.
The routing method specifies the callback function (also called the handler function) that will be called when the application receives a request for a given route (endpoint) and HTTP method.

Each route has one or more handler functions, which are executed when the routes are matched.

# Overview
Structure
> app.METHOD(PATH, HANDLER)
- app: instance of express
- METHOD: HTTP request method
- PATH: path on the server
- HANDLER: Function to be executed when the route matches

## Defining a route
The home page responds with Hello World!
```js
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```
Respond to POST requests at the root root (/), the top page of the application.
```js
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
```
Respond to a PUT request for the /user route.
```js
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```
Respond to a DELETE request for the /user route.
```js
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

# How to use routing.
## Basic routes
In the URL object, parse the URL data (parse the data and reassemble it to its original state).
This checks the value of the path part of the domaining, and branches accordingly.
```js
const url = require('url');

var url_parts = url.parse(request.url);
switch(url_parts.pathname) {
  case "/":
    Process when "/" is accessed
    break;
}
```
- [app.all()](http://expressjs.com/ja/4x/api.html#app.all): Controls all HTTP methods.
- [app.use()](http://expressjs.com/ja/4x/api.html#app.use): Specify middleware.

## Express version, basic routes
```js
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
```

## route method
The route method is derived from any of the HTTP methods and is appended to the instance of the express class.

Examples of routes defined for **GET method** and **POST method** to the application routes: ````js'''''.
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
A special routing method used to load middleware functions into the path of all HTTP request methods. 
Regardless of which method is used, the following handler will be executed for requests to the "/secret" route.
```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

## Root path
The route path, in combination with the request method, defines the endpoint where the request can be executed.
It can be a string, a string pattern, or a regular expression.

- Matching a request to a root root /.
```js
app.get('/', function (req, res) {
  res.send('root')
})
```
- Matching requests to /about
```js
app.get('/about', function (req, res) {
  res.send('about')
})
```
- Matching requests to /random.text
```js
app.get('/random.text', function (req, res) {
  res.send('random.text')
})
```

Next, an example of a root path based on a string pattern

- Matching acd and abcd
```js
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
```
- Matching abcd, abbcd, abbbcd, etc.
```js
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})
```
- Matches abcd, abxcd, abRABDOMcd, ab123cd, etc.
```js
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})
```
- Matching /abe and /abcde
```js
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})
```

Next, an example of a root path based on a regular expression

- Matching everything with "a" in the root name
```js
app.get(/a/, function (req, res) {
  res.send('/a/')
})
```
- Matches butterfly and dragonfly, but does not match butterflyman, dragonfly man, etc.
```js
app.get(/. *fly$/, function (req, res) {
  res.send('/. *fly$/')
})
```

## Route handlers
To handle requests, you can specify multiple callback functions that act like middleware.
Route handler format 1.
1. function
2. array of functions
3. a combination of both

- A single callback function handles a single route
```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```
- Process a single route with multiple callback functions (always specify the next object)
```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```
- Handle a single route with an array of callback functions
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) { console.log('CB1') next() }
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```
- Handle a single route with a combination of independent functions and an array of functions.
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) { console.log('CB1') next() }
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
Use `app.route()` to create a concatenable route handler for the route path.
Paths are specified in a single location
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
Use the `express.Router` class to create a modular, mountable route handler.
A Router instance is a complete middleware and routing system, referred to as a "mini-application". 1.

1. create a router as a module
2. load middleware functions into it 3. define some routes
Define some routes 4.
Mount the root module in the main application path.

Create a router file called birds.js in the application directory with the following contents
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
Next, we load the router module into our application.
```js
var birds = require('. /birds')
// ...
app.use('/birds', birds)
```
Now the application can handle requests for /birds and /birds/about, as well as call route-specific timeLog middleware functions.


***


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