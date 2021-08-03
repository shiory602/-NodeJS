# Express-session
- セッションデータはサーバーにされ、セッションIDだけがCookieに保存される。
- バージョン 1.5.0 からは cookie-parser ミドルウェアは必要なくなった。

# オプション
## cookie
セッションIDのcookieを設定するオブジェクト。デフォルト値は`{ path: '/', httpOnly: true, secure: false, maxAge: null }`

cookieに設定できるオプションは以下のとおり

## cookie.domain
Domain Set-Cookie属性の値を指定。デフォルトではドメイン設定なし。

## cookie.expires
Expires Set-Cookie属性の値として、Dateオブジェクトを指定。
> デフォルトでは、有効期限は設定されておらず、ほとんどのクライアントはこのクッキーを「非永続的なクッキー」とみなし、ウェブブラウザのアプリケーションを終了するなどの条件で削除することになる。
expiresとmaxAgeの両方がオプションに設定されている場合は、オブジェクトに定義されている最後のものが使用される。
expiresオプションを直接設定しないで、maxAgeオプションのみを使用すること。

## cookie.httpOnly
HttpOnly Set-Cookie属性に真偽値を指定。trueの時はHttpOnly属性は**set**、falseの時は**not**になる。
> デフォルトは**set**。

## cookie.maxAge
Expires Set-Cookie属性を計算する際、使用する数値（ミリ秒単位）を指定。
現在のサーバー時刻を取得し、その値にmaxAgeミリ秒を加えて、Expiresの日時を計算する。
> デフォルトでは、最大年齢は設定されない。
オプションでexpiresとmaxAgeの両方が設定されている場合、オブジェクトで最後に定義されたものが使用される。

## cookie.path
Path Set-Cookieに値を指定。
> デフォルトはドメインの`/`（ルートパス）が設定される。

## cookie.sameSite
SameSite Set-Cookie属性の値となる真偽値または文字列を指定します。
まだ完全に標準化されていない属性であり、将来的に変更される可能性がある。

## cookie.secure
Secure Set-Cookie 属性の真偽値を指定。
True の場合、Secure 属性が設定され、False の場合は設定されない。
> デフォルトは、Secure 属性は設定されていない。
True は推奨されるオプションであることに注意。ただし、https対応のウェブサイトが必要。
secureが設定されていても、HTTPでサイトにアクセスすると、クッキーは設定されない。
node.jsをプロキシ経由で使用していて、`secure: true`を使用している場合は、expressで `"trust proxy"` を設定する必要がある。
```js
var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
```
本番環境では保護されたクッキーを使用し、開発環境ではテストを可能にするために、expressのNODE_ENVに基づいてこの設定を有効にする例が以下。
```js
var app = express()
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
```
### auto
cookie.secureオプションに「auto」を設定すると、自動的に接続のセキュリティを決定するものと一致するようになる。
サイトがHTTPとHTTPSの両方で利用可能でかつ、HTTPSでクッキーが設定されると、HTTPでは表示されなくなるので注意が必要。
Expressの "trust proxy" が設定されている場合に、開発用と本番用の構成を簡略化するのに役立つ。

## genid
新しいセッションIDを生成するために呼び出す関数。
セッションIDとして使用される文字列を返す関数を提供する。
IDを生成する際にreqに付随する何らかの値を使用したい場合は、この関数の第1引数にreqを入れる。
> デフォルトでは、uid-safeライブラリを使ってIDを生成する関数が指定される。
注意：セッションが競合しないように、ユニークなIDを生成すること。
```js
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
```

## name
レスポンスに設定する/リクエストで読み取る セッションIDクッキーの名前
> デフォルト値は`connect.sid`

同じホスト名で複数のアプリを実行している場合は（localhostや127.0.0.1などはただの名前。スキームやポートが違っていてもホスト名は同じ）、セッションクッキーをそれぞれ分ける必要がある。最も簡単な方法は、アプリごとに異なる名前を設定することである。

## proxy
保護されたクッキーを設定する際に、リバースプロキシを信頼する（"X-Forwarded-Proto "ヘッダ経由）。
> デフォルト値は undefined
- true: "X-Forwarded-Proto "ヘッダが使用される。
- false: すべてのヘッダーが無視され、直接 TLS/SSL 接続がある場合にのみ、接続が安全であると見なされる。
- undefined: express の「trust proxy」設定を使用。

## resave
リクエスト中にセッションが変更されていなくても、セッションを強制的にセッションストアに保存し直す。
ストアによってはこれが必要な場合もある。
しかし、クライアントがサーバに対して2つのリクエストを並行して行う上で、一方のリクエストでセッションに変更があると、他方のリクエストに変更がなかったとしても上書きされてしまう可能性がある（この動作は、使用しているストアによっても異なる）。
> デフォルトはtrue（変更予定のため、デフォルトを使用することは非推奨であり、一般的にはfalseを選択する）

## rolling
レスポンスで毎回セッション識別子クッキーを強制的に設定。
有効期限は元の**maxAge**にリセットされ、有効期限のカウントダウンもリセットされる。
> デフォルトは false
有効にするとセッション識別子クッキーの有効期限は、セッションがサーバによって最後に変更されてからのmaxAgeではなく、最後にレスポンスが送信されてからのmaxAgeになる。

通常、セッションの長さではない短いmaxAge値と組み合わせて使用され、継続的なサーバとのやり取りの中で発生する可能性のあるセッションデータのタイムアウトを迅速に行うことができます。

注意 このオプションを true に設定し、saveUninitialized オプションを false に設定した場合、セッションが初期化されていない応答に対しては、クッキーは設定されません。このオプションは、リクエストに対して既存のセッションが読み込まれた場合の動作のみを変更します。


## saveUninitialized
初期化されていないセッションを強制的にストアに保存する。
初期化されていないセッションとは、セッションが新しく作成され、変更されていない状態を指す。
falseを選択すると、ログインセッションの実装、サーバーのストレージ使用量の削減、Cookieを設定する前に許可を求める法律への準拠などに役立つ。また、Falseを選択すると、クライアントがセッションを持たずに複数のリクエストを並行して行うような競合状態を回避できます。
> デフォルトはtrue（将来的にデフォルトが変更されるため、デフォルトを使用することは推奨されない。）
SessionをPassportJSと併用している場合、Passportはユーザが認証された後に使用する空のPassportオブジェクトをセッションに追加するが、これはセッションの変更として扱われ、保存される原因となる。これはPassportJS 0.3.0で修正。

# Required option
セッションIDクッキーに署名するための秘密を単一の秘密の文字列か、複数の秘密の配列のいずれかで指定。
秘密の配列を指定した場合は、最初の要素だけがセッション ID クッキーの署名に使用され、すべての要素はリクエストの署名を検証するときに考慮される。シークレット自体は人間が簡単に解析できないもので、ランダムな文字の集合であることがベスト。
### ベストオブプラクティス
- 環境変数を使ってシークレットを保存し、シークレット自体がリポジトリに存在しないようにする。
- 定期的に秘密を更新し、前回の秘密が配列にあることを確認する。
推測できない秘密を使うことで、セッションを乗っ取ることができるのは（genidオプションで決定される）セッションIDだけになる。

秘密の値を変更すると、既存のセッションがすべて無効になる。セッションを無効にせずにシークレットを変更するには、シークレットの配列を用意。新しいシークレットを配列の最初の要素とし、以前のシークレットを後の要素に含める。

## store
セッションストアのインスタンス。
> デフォルトでは新しいMemoryStoreのインスタンスが使用される。

## unset
req.sessionをアンセットしたときの結果を制御（deleteをして、nullへの設定など）。
> デフォルト値は「keep」です。
- 'destroy' レスポンスの終了時にセッションが破棄（削除）される。
- 'keep' ストア内のセッションは保持されますが、リクエスト中に行われた変更は無視され、保存されない。

## req.session
セッションデータを保存したりアクセスしたりするには、単純にリクエストプロパティ req.session を使用。これは（一般的に）ストアによって JSON としてシリアル化されるため、ネストしたオブジェクトでも通常は問題ない。
以下はユーザー固有のビューカウンタの例：
```js
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
```

## Session.regenerate(callback)
セッションを再生成するには、このメソッドを呼び出すだけ。
完了すると、新しいSIDとSessionインスタンスがreq.sessionで初期化され、コールバックが呼び出される。
```js
req.session.regenerate(function(err) {
  // will have a new session here
})
```

## Session.destroy(callback)
セッションを破棄し、req.sessionプロパティをアンセットする。
完了すると、コールバックが呼び出される。
```js
req.session.destroy(function(err) {
  // cannot access session here
})
```

## Session.reload(callback)
ストアからセッションデータを再読み込みし、req.sessionオブジェクトを再入力。
完了すると、コールバックが呼び出される。
```js
req.session.reload(function(err) {
  // session updated
})
```

## Session.save(callback)
セッションをストアに保存し、ストア上のコンテンツをメモリ上のコンテンツに置き換える（ただし、ストアによっては別の動作をする場合もある。正確な動作についてはストアのドキュメントを参照）。

このメソッドは、セッションデータが変更された場合、HTTPレスポンスの最後に自動的に呼び出される（ただし、この動作は、ミドルウェアのコンストラクタのさまざまなオプションで変更できる）。このため、通常はこのメソッドを呼び出す必要はない。

ただし、リダイレクトや長時間のリクエスト、WebSocketなど、このメソッドを呼び出したほうが便利な場合もある。
```js
req.session.save(function(err) {
  // session saved
})
```

## Session.touch()
.maxAgeプロパティを更新。
通常は、セッションミドルウェアがこれを行うので、これを呼び出す必要はない。

## req.session.id
各セッションには、それに関連した一意のIDがある。
このプロパティはreq.sessionIDのエイリアスであり、変更することはできない。
セッションオブジェクトからセッションIDにアクセスできるようにするために追加されたもの。

## req.session.cookie
各セッションには、固有のクッキーオブジェクトが付随している。
これにより、訪問者ごとにセッションクッキーを変更することができる。
例えば、req.session.cookie.expiresをfalseに設定することで、ユーザーエージェントが存在する間だけクッキーを保持することができる。

## Cookie.maxAge
req.session.cookie.maxAgeは残り時間をミリ秒単位で返すが、これも新しい値を割り当てて.expiresプロパティを適切に調整することができる。以下は基本的に同等です。
```js
var hour = 3600000
req.session.cookie.expires = new Date(Date.now() + hour)
req.session.cookie.maxAge = hour
```
例えば、maxAgeが60000（1分）に設定されている場合、30秒が経過すると、現在のリクエストが完了するまで30000を返す。
このとき、`req.session.touch()`が呼び出され、req.session.cookie.maxAgeが元の値にリセットされる。
```js
req.session.cookie.maxAge // => 30000
```

## Cookie.originalMaxAge
req.session.cookie.originalMaxAgeプロパティは、セッションクッキーのオリジナルのmaxAge（生存期間）をミリ秒単位で返す。

## req.sessionID
読み込まれたセッションのIDを取得するには、リクエストのプロパティreq.sessionIDにアクセスします。これは単に、セッションの読み込み/作成時に設定される読み取り専用の値です。

# セッションストアの実装
すべてのセッションストアは、EventEmitterであり、特定のメソッドを実装する必要がある。
以下のメソッドは、必須、推奨、およびオプションのリスト。

- 必須のメソッドは、このモジュールがストア上で常に呼び出す。
- 推奨されるメソッドは、利用可能な場合にこのモジュールがストア上で呼び出すメソッド。
- オプションのメソッドは、このモジュールがまったく呼び出さないものですが、ユーザーに統一されたストアを提示するのに役立つ。
実装例については、[connect-redis repo](https://github.com/tj/connect-redis)参照。

## store.all(コールバック)
オプション
ストア内のすべてのセッションを配列として取得するために使用。
コールバックは`callback(error, sessions)`のように呼ばれる。

## store.destroy(sid, callback)
必須
セッションID（sid）を指定してストアからセッションを破棄/削除するために使用。
セッションが破棄されると、コールバックは`callback(error)`として呼び出される必要がある。

## store.clear(コールバック)
オプション
ストアからすべてのセッションを削除するために使用。
ストアがクリアされると、コールバックは`callback(error)`として呼び出される必要がある。

## store.length(callback)
オプション
ストア内のすべてのセッションのカウントを取得するために使用。
コールバックは、`callback(error, len)`として呼び出す必要がある。

## store.get(sid, callback)
必須
セッションID（sid）を指定してストアからセッションを取得するために使用。
コールバックは、`callback(error, session)`として呼び出す必要がある。

引数sessionは、セッションが見つかった場合はセッション、セッションが見つからなかった（エラーがなかった）場合はnullまたはundefinedとする。
特殊なケースとして、`error.code === 'ENOENT'`の場合は、`callback(null, null)`のように動作します。

## store.set(sid, session, callback)
必須
セッションID（sid）とセッション（session）オブジェクトを指定して、セッションをストアにアップサートするために使用。
セッションがストアに設定されると、コールバックはcallback(error)として呼び出される必要がある。

## store.touch(sid, session, callback)
推奨方法
セッションID（sid）とセッション（session）オブジェクトを指定して、指定されたセッションを「タッチ」するために使用。
セッションがタッチされると、コールバックはcallback(error)として呼び出される必要がある。

これは主に、ストアがアイドル状態のセッションを自動的に削除する場合に使用。このメソッドは、与えられたセッションがアクティブであることをストアに知らせるために使用され、アイドルタイマーをリセットする可能性がある。

# Example

Express-sessionを使った簡単な例

### インストール
```
npm install express-session
```

```js
var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})
```

# デバッグ
このモジュールは、内部で debug モジュールを使用して、セッション操作に関する情報をログに記録します。

すべての内部ログを表示するには、アプリの起動時（この例では、npm start）に環境変数 DEBUG を express-session に設定します。
```
$ DEBUG=express-session npm start
```

***

[express-session](http://expressjs.com/en/resources/middleware/session.html), [[Node.js][Express]セッションを使う](https://tech.chakapoko.com/nodejs/express/session.html)