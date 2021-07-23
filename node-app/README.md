# Use HTML files
To use HTML files, we use the **File System** object.
This is provided in Node.js under the ID **fs**.
## How to use fs
1. run `require` to get `fs` into the object
```js
variable = require('fs')
```
2. read files with the method `readFile` in the `fs` object
```js
fs.readFile(file path to read, encoding format of the file contents, callback function to execute on completion)
```
`readFile` finishes execution instantly, no matter how big the file is, and moves on.
The reading process is done in the background, and the third argument function is executed after it is completed.
### callback function for readFile
When the time-consuming process is finished, the function to be called later
```js
(error, data) => { ... Processing ... }
```

## Replace text
`replace` searches for the first argument, the search text, in the text and replaces it with the second argument, the replacement text.
```
Variable = text .replace( find text, replace text );
```
### Regular Expressions
Use regular expressions to search based on "patterns" of text connections.
- `g` does a global search.
```
/ ... /g
```
[Regular expression MDN](https://developer.mozilla.org/ja/docs/orphaned/Web/JavaScript/Guide/Regular_Expressions)


# Template engine
A mechanism for preparing content to be displayed using templates.
### EJS
A simple template engine for use with JavaScript.
EJS stands for **Embedded JavaScript Templates**, and in Node.js it is installed in the package manager.
To install, type the following command into a terminal
```
npm install -g ejs
```
## How to display the EJS file
1. load the template file
```js
const index_page = fs.readFileSync('. /index.ejs', 'utf8')
```

2. rendering
Generate the actual HTML source code to be displayed based on the contents of the template.
(You don't need to do this if the template itself is HTML.
```js
var content = ejs.render(index_page);
```
3. Output the generated display content
Output the generated display content using ``write`` or other methods.
```js
response.writeHead(200, {'Content-Type': 'text/html'});
response.write(content);
response.end()
```
### Error: Cannot find module 'ejs' is displayed.
Navigate to the app file with a terminal, do `npm init`, and then execute the following command
```
npm install --save ejs
```
### readFileSync
Method to read with synchronous processing
`readFile` is asynchronous processing.
## embedding values
Use the code below to embed a value in the HTML code of an ejs file.
```js
<%= ... %>
```
The first argument of rendering is the data to be rendered and the second argument is an object containing the values.
```js
var content = ejs.render(index_page, {
    title: 'Index',
    content: 'This is a sample page with template.'
});
```



***


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
### readFileSync
同期処理で読み込むメソッド
`readFile`は非同期処理
## 値の埋め込み
ejsファイルのHTMLコードの中に下のコードを使って値を埋め込む
```js
<%= ... %>
```
レンダリングの第一引数にレンダリングするデータ、第二引数に値をまとめたオブジェクトを指定
```js
var content = ejs.render(index_page, {
    title: 'Index',
    content: 'This is sample page with template.'
});
```