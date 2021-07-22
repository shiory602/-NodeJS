# Node.js

## Node.jsでサーバーを生成するスクリプトを作る
`createServer`を使ってサーバーを生成する
```js
const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/':
            res.end('hello')
    }
})

server.listen(port, () => {
    `This is host name ${port}`
})
```

## `npm init`コマンドで package.json を生成する
# npm init
初期化処理のこと
`package.json`が生成される。
### コマンド
```
npm init
```
### 表示される内容
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (lab2) 
```
質問に答えていくことで生成できる
（全て無回答`Enter`でも問題はない）

### 質問項目
1. パッケージの名前
2. version: (1.0.0) というバージョンで生成するかと尋ねられている
3. 概要説明
4. 初期表示させるファイル
5. テストコマンド
6. Github等に保存するリポジトリ情報の初期状態
7. npm公開時等で使用されるキーワードを設定
8. npm公開時に必要とされる作者情報
9. npm公開時に適用する権利情報
```
package name: (a) sample
version: (1.0.0) 0.0.0
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: your name
license: (ISC)
```
最後にokかを聞かれるのでエンター
```
Is this ok? (yes) 
```

## packege.json で `npm start`スクリプトを設定する
### npm startの設定
package.jsonをインストールしたらnpmを使用してファイルやプロジェクトを実行してみる
### package.jsonの書き換え
`start`の中には`node 実行したいファイル名`を入れる
```
"scripts": {
    "start": "node node.js"
}
```

## npmコマンドを使うためにnodemonをインストールする
[nodemon](https://www.npmjs.com/package/nodemon)
### nodemonのインストール
Node.js を自動で再起動する
```
npm install -g nodemon
```
https://www.npmjs.com/package/nodemon
### 実行方法
```
nodemon app.js
```

## シンプルなモジュールを生成して`exports`する
- exports
`exports`の方法は二つあるのでどちらかを使う
```
var abc = function(s) {
  console.log(s);
}

module.exports = abc;
```
もしくは
```
exports.abc = function(s) {
  console.log(s);
}

var edf = function(s) {
  console.log(s);
}
exports.edf = edf;
```

## ファイルを作成して、新しいファイルにインポートする
- require
```
var test = require('./test');
test.a('hello');
test.b('world');
```


***



# エラーが出る
## Error: listen EADDRINUSE: address already in use :::3000
### 実行したコマンド
```
node app.js
```
### 出てきたエラー
```
Error: listen EADDRINUSE: address already in use :::3000
```
### 下記コマンドを実行する 
```
npx kill-port 3000
```
これで`node app.js`を実行するとちゃんと作動する

## throw er; // Unhandled 'error' event
> サーバーにリクエストしたけど、エラーが返った時の処理を書いていなかったため、このエラーがでた
[参考サイト](https://gist.github.com/kcpjunky/7963541)

# HTMLコードがそのまま表示される
`writeHead`の第二引数が`plain`になっていた
```
res.writeHead(200, {'Content-Type': 'text/plain'});
```
`text/html`に変更すると文字だけ表示された
```
res.writeHead(200, {'Content-Type': 'text/html'});
```
| コード | 内容 |
| --- | --- |
| Content-Type | コンテンツの種類 |
| text/html | テキストデータでHTML形式のもの |


***


# HTMLファイルを使う