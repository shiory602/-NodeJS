// var express = require('express');
// var app = express();

// // app.use('/shiori', express.static('public')); // publicディレクトリに入っているファイルをロード
// app.use('/static', express.static(__dirname + '/public')); // 絶対パス（こっちの方が安全 -> /static/css/style.css

// app.get('/', (req, res) => {
//     res.send('Hello world.');
// });

// app.post('/', (req, res) => {
//     res.send('Got a POST request');
// });

// app.put('/user', (req, res) => {
//     res.send('Got PUT request at /user');
// });

// app.delete('/user', (req, res)=> {
//     res.send('Got a DELETE request at /user');
// });


// app.use(function(req, res, next) {
//     res.status(404).send('Sorry cant find that!');
// });

// app.listen(3000, ()=> {
//     console.log('Server is on 3000');
// })

// list 2-13
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(4000);
console.log('server start!');

// ここまでメインプログラム ==================

// CreateServerの処理
function getFromClient(request, response) {
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname) {

        case '/':
            var content = ejs.render(index_page, {
                title: 'Index',
                content: 'This is sample page with template.'
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(style_css);
            response.end();
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}
