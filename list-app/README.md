# What is Express?
ExpressJS is a web application framework that provides you with a simple API to build websites, web apps and back ends. It is flexible as there are numerous modules available on npm, which can be directly plugged into Express.

# Environment
To start with, you should have the Node and the npm(node package manager) installed. Confirm that node and npm are installed by running the following commands in your terminal.
```
node -v
npm -v
```
## Set up
If you don't have npm, you need to install it first.
```
npm install -g <package-name>
```
Whenever we create a project using npm, we need to provide a `package.json` file, which has all the details about our project.
1. Start your terminal/cmd, create a new folder named it and cd (create directory) into it
```
$ mkdir node_app
$ cd node_app
```
2. Now to create the package.json file using npm, use the following code.
```
npm init
```
Just keep pressing enter, and enter your name at the "author name" field.
3. Now we have our package.json file set up, we will further install Express.
### Difference between `npm` and `npm -g`
> This method is generally used to install frameworks and libraries. A locally installed package can be used only within the directory it is installed. To install a package locally, use the same command as above without the -g flag. [Express](https://www.tutorialspoint.com/expressjs/expressjs_environment.htm)
## Install Express
> Assuming you have Node.js and npm installed
To install Express and add it to our package.json file, use the following command
```
npm install --save express
```
To confirm that Express has installed correctly, run the following code.
### Tip: --save
> Tip − The `--save` flag can be replaced by the `-S` flag. This flag ensures that Express is added as a dependency to our **package.json** file. This has an advantage, the next time we need to install all the dependencies of our project we can just run the command npm install and it will find the dependencies in this file and install them for us.

Also create a `.gitignore` file because a lot of data will be stored at this time.
Ignore `/node_module`.
## Nodemon(Node manager)
To make our development process a lot easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files, otherwise we need to restart the server manually after each file modification.
```
npm install -g nodemon
```

# Developing
Create a new file called `index.js` and type the following in it.
```js
const express = require('express'); // load
const app = express(); // Prepare to use express

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.listen(3000);
```
Save the file, go to your terminal and type the following.
```
nodemon index.js
```
This will start the server. To test this app, open your browser and go to **http://localhost:3000**.

### How the App Works
Use `listen()` for the value assigned to `express()` instead of `http`.
```js
app.listen(port, [host], [backlog], [callback])
```
## Routing
Web frameworks provide resources such as HTML pages, scripts, images, etc. at different routes. The following function is used to define routes in an Express application.
> app.method(path, handler)
- method: **METHOD** can be applied to any one of the HTTP verbs - get, set, put, delete.
- path: The route at which the request will run.
- handler: A callback function that executes when a matching request type is found on the relevant route.
For example
```js
const express = require('express'); // load
const app = express(); // Prepare to use express

app.get('/hello', (req, res) => {
    res.send("Hello world!");
})

app.listen(3000);
```
If we run our application and go to **http://localhost:3000/hello**, the server receives a get request at route `/hello`, our Express app executes the callback function attached to this route and sends "Hello world!" as the response.
## Create the appearance of the top screen
For the look and feel that will be displayed in the browser, we'll use a file in the format `EJS` (`ejs` is like HTML).
This will be placed in a folder called views and called a view file.
### Display the specified view file in the browser.
``js
res.render('top.ejs')
```
## Use of CSS
> Express stores CSS and images in the public folder.
Use the following code to load files in the public folder
```js
app.use(express.static('public'))
```
### Apply CSS
Specify the path in the public folder in the EJS file
```html
<link rel="stylesheet" href=". /css/style.css>
```
# What is EJS?
A package that allows JavaScrip to be embedded in HTML.
Install with the following command
```
npm install ejs
```
## How to use EJS
When writing JavaScript code, use the specified writing style
- `<% %>`: Nothing is displayed (variable definitions, etc.)
- `<%= %>`: Displayed in the browser (variable values, etc.)
Example
```js
<% const item= { id: 4, name: "tomato"} %>

<%= item.id %> // 4
<%= item.name %> // tomato
```
### By using forEach.
Create an array and iterate through it using the `forEach` method
1. compile a list and define an array
```js
<% const items= [
    {id: 1, name: "Potato"},
    {id: 2, name: "Carrot"},
    {id: 3, name: "Onion"},
]; %>
```
2. Display array objects in a list screen using `<%= %>`.
Use `<% %>` because `forEach` does not display them on the screen.
```js
<ul class="table-body">
    <% items.forEach((item) => { %>
        <li>
            <span class="id-column"><%= item.id %></span>
            <span class="name-column"><%= item.name %></span>
        </li>
    <% }); %>
</ul>
```
## Use links to connect the screens.
Use **root URL(/)** for the top screen URL.
```js
app.get('/', (req, res) => {
    res.render('top.ejs');
})
```
Create a link button using the `<a>` tag
```js
<a href="/" class="header-logo">
    LIST APP
</a>
```

***
# Resource
[Express tutorial](https://www.tutorialspoint.com/expressjs/index.htm)
[Progate](https://prog-8.com/)


***


# Expressとは
Webアプリを開発するためのフレームワーク
Express は npm からインストールする
## Express のインストール
> Node.js と npm が入っていること前提
インストールしたい先のフォルダでコマンド入力
```
npm install express
```
この時大量のデータが保存されるので`.gitignore`ファイルを作成しておく
`/node_module`をignoreする

# Express の利用
```js
const express = require('express') // 読み込み
const app = express() // express 利用の準備
```

### Express でサーバーを起動するには
`http`ではなく`express()`を代入した値に`listen()`を使う
```js
// app.listen(port, [host], [backlog], [callback]])
app.listen(3000);
```
ターミナル上で`node app.js`を実行
## ルーティング
URL に対応する処理を実行することをルーティングという
引数には req と res の二つを用いる
> app.get('URL', ルーティングの処理)
```js
app.get( '/top', (req, res) => {
    // top画面を表示
})
```
## トップ画面の見た目を作る
ブラウザに表示する見た目には`EJS`という形式のファイルを使う（`ejs` は HTML のようなもの）
これは views というフォルダに配置し、ビューファイルと呼ぶ
### 指定したビューファイルをブラウザに表示
```js
res.render('top.ejs')
```
## CSS の利用
> Express では CSS や画像を public フォルダに保存する
下記のようなコードで public 内のファイルを読み込むようにする
```js
app.use(express.static('public'))
```
### CSS の適用
EJS ファイルで public フォルダ内のパスを指定
```html
<link rel="stylesheet" href="./css/style.css>
```
# EJS とは
HTML の中に JavaScrip を埋め込む（Embedded）ことができるパッケージ
下記コマンドでインストール
```
npm install ejs
```
## EJS の使い方
JavaScript のコードを記述するときは指定の書き方を利用する
- `<% %>`：何も表示されない（変数の定義など）
- `<%= %>`：ブラウザに表示される（変数の値など）
例
```js
<% const item= { id: 4, name: "tomato"} %>

<%= item.id %> // 4
<%= item.name %> // tomato
```
### forEachを使うことで簡単に表示
配列を作成して`forEach`メソッドを使って繰り返し処理を行う
1. リストをまとめ、配列を定義
```js
<% const items= [
    {id: 1, name: "Potato"},
    {id: 2, name: "Carrot"},
    {id: 3, name: "Onion"},
]; %>
```
2. 配列のオブジェクトを`<%= %>`を使って一覧画面に表示
`forEach`は画面に表示させないので`<% %>`を使う
```js
<ul class="table-body">
    <% items.forEach((item) => { %>
        <li>
            <span class="id-column"><%= item.id %></span>
            <span class="name-column"><%= item.name %></span>
        </li>
    <% }); %>
</ul>
```
## リンクを使って画面をつなげる
トップ画面のURLは**ルートURL(/)**を使う
```js
app.get('/', (req, res) => {
    res.render('top.ejs');
})
```
リンクボタンの作成は`<a>`タグを使って
```js
<a href="/" class="header-logo">
    LIST APP
</a>
```


***
# Resource
[Express tutorial](https://www.tutorialspoint.com/expressjs/index.htm)
[Progate](https://prog-8.com/)
