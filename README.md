# Node.js

## Create a script to create a server in Node.js
Use `createServer` to create a server.
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

## Generate package.json with `npm init` command.
# npm init
The initialization process.
`package.json` will be generated.
### Command.
```
npm init
```
### Displayed content.
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields and exactly what they do.
See `npm help init` for definitive documentation on these fields and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.

Press ^C at any time to quit.
Package name: (lab2) 
```
You can generate it by answering the questions.
(It doesn't matter if you don't answer any of them, just ``Enter``)

### Questions: 1.
1. name of the package
2. version: Asked if you want to generate the version (1.0.0). 3.
3. summary description 4.
4. file to be initially displayed 5. test command
5. test command
6. initial state of repository information to be saved in Github etc. 7.
7. set keywords to be used when publishing npm
8. author information required when publishing npm
Rights information to be applied when npm is released 9.
```
package name: (a) sample
version: (1.0.0) 0.0.0
Description:
entry point: (index.js)
test command:
git repository:
keywords:
author: your name
license: (ISC)
Enter
Enter when prompted for ok at the end
``` (yes)
Is this ok? 
```

## Configure the `npm start` script in packege.json
### Set up npm start.
After installing package.json, try to run the files and projects using npm.
### Rewrite package.json.
In `start`, put `node the name of the file you want to run`.
```
"scripts": {
    "start": "node node.js"
}
```

## Install nodemon to use the npm command.
[nodemon](https://www.npmjs.com/package/nodemon)
## Install nodemon.
Restart Node.js automatically.
```
npm install -g nodemon
```
https://www.npmjs.com/package/nodemon
### How to execute
```
nodemon app.js
```

## Generate a simple module and `exports` it.
- exports
There are two ways to do `exports`, use one of them.
```
var abc = function(s) {
  console.log(s);
}

module.exports = abc;
```
or
```
exports.abc = function(s) {
  console.log(s);
}

var edf = function(s) {
  console.log(s);
}
exports.edf = edf;
```

## Create a file and import it into a new file
- require
```
var test = require('. /test');
test.a('hello');
test.b('world');
```


***



# error.
## Error: listen EADDRINUSE: address already in use :::3000
### Command executed.
```
node app.js
```
### Errors encountered.
```
Error: listen EADDRINUSE: address already in use :::3000
```
### Run the following command. 
``` npx kill-port 3000
npx kill-port 3000
``` npx kill-port 3000
Now, when you run `node app.js`, it works fine.

## throw er; // Unhandled 'error' event
> I got this error because I made a request to the server but didn't write what to do when an error was returned.
[Reference site](https://gist.github.com/kcpjunky/7963541)

# The HTML code is displayed as is.
The second argument of `writeHead` was set to `plain`.
```
res.writeHead(200, {'Content-Type': 'text/plain'});
````
Only text was displayed when changed to `text/html`.
```
res.writeHead(200, {'Content-Type': 'text/html'});
```
| code | content | ...
| --- | --- | Content-Type
| Content-Type | content-type | text/html
| text/html | text data in HTML format |
 Translated with www.DeepL.com/Translator (free version)
 
 
 
 
 ***
 
 
 
 
 
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

