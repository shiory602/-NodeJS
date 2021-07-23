# HTMLファイルを使う
HTMLファイルを使うには**File System**オブジェクトを使う。
これは**fs**というIDでNode.jsに用意されている。
## fsを使う方法
1. `require`を実行して`fs`をオブジェクトに取り込む
```js
変数 = require('fs')
```
2.  `fs`オブジェクト内にある`readFile`というメソッドでファイルを読み込む
```js
fs.readFile(読み込むファイルパス, ファイルの内容のエンコーディング形式, 完了時実行するコールバック関数)
```
`readFile`はファイルの大きさがどれだけあっても瞬時に実行を終え、次に進む。
読み込み作業はバックグラウンドで行われ、完了した後に第三引数の関数を実行する。
### readFileのコールバック関数
時間のかかる処理が終わったら、後で呼び出される関数
```js
(error, data) => { ...処理... }
```

## テキストの置換
`replace`はテキストの中から第一引数の検索テキストを探し出し、それを第二引数の置換テキストに置き換える
```
変数 = テキスト .replace( 検索テキスト, 置換テキスト );
```
### 正規表現
テキストの繋がりを表す「パターン」を元に検索を行う正規表現を使う
- `g`はグローバル検索を行う
```
/ ... /g
```
[正規表現MDN](https://developer.mozilla.org/ja/docs/orphaned/Web/JavaScript/Guide/Regular_Expressions)


# テンプレートエンジン
テンプレートを使って表示するコンテンツを用意するための仕組み
### EJS
JavaScriptで利用するシンプルなテンプレートエンジン
**Embedded JavaScript Templates**の略称のことを言い、Node.jsではpackageマネージャーにインストールする
インストール方法は下記コマンドをターミナルに入力
```
npm install -g ejs
```
## EJSファイルの表示方法
1. テンプレートファイルを読み込む
```js
const index_page = fs.readFileSync('./index.ejs', 'utf8')
```
2. レンダリングする
テンプレートの内容を元に、実際に表示されるHTMLのソースコードを生成する
（テンプレート自体がHTMLの時は行わなくても良い）
```js
var content = ejs.render(index_page);
```
3. 生成された表示内容を出力する
生成された表示内容を`write`などを使って出力する
```js
response.writeHead(200, {'Content-Type': 'text/html'});
response.write(content);
response.end()
```
### Error: Cannot find module 'ejs'が表示されたら
ターミナルでアプリのファイルまで移動して`npm init`をした後に下記コマンドを実行
```
npm install --save ejs
```