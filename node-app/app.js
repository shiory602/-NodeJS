// list 2-1
// const http = require('http');

// var server = http.createServer(
//     (request, response) => {
//         response.setHeader('Content-Type', 'text/html');
//         response.write('<!DOCTYPE html><html lang="en">');
//         response.write('<head><meta charset="utf-8">');
//         response.write('<title>Hello</title></head>');
//         response.write('<body><h2>Hello, world!</h2>');
//         response.write('<p>This is Node.js sample page</p>');
//         response.write('<p>This is Node.js sample page</p>', 'utf8');
//         response.write('</body></html>');
//         response.end();
//     }
// );

// server.listen(3000, console.log('server start!'))



// // list 2-5
// const http = require('http');
// const fs = require('fs');

// var server = http.createServer(
//     (request, response) => {
//         fs.readFile('./index.html', 'UTF-8',
//             (err, data) => {
//                 response.writeHead(200, {'Content-Type': 'text/html'});
//                 response.write(data);
//                 response.end()
//             });
//     }
// );

// server.listen(3000, console.log('server start!'))



// // list 2-6
// const http = require('http');
// const fs = require('fs');

// var server = http.createServer(getFromClient)
// server.listen(3000);
// console.log('server start!');

// // ここまでメインプログラム ==================

// // CreateServerの処理
//     function getFromClient(req, res) {
//         request = req;
//         response = res;
//         fs.readFile('./index.html', 'UTF-8',
//             (err, data) => {
//                 response.writeHead(200, {'Content-Type': 'text/html'});
//                 response.write(data);
//                 response.end()
//             });
//     }



// // list 2-7
// const http = require('http');
// const fs = require('fs');
// var request;
// var response;

// var server = http.createServer(getFromClient);

// server.listen(3000);
// console.log('server start!');

// // ここまでメインプログラム ==================

// // CreateServerの処理
// function getFromClient(req, res) {
//     request = req;
//     response = res;
//     fs.readFile('./index.html', 'UTF-8', writeToResponse)
// }

// // readFile完了後の処理
// function writeToResponse(err, data) {
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write(data);
//     response.end()
// }




// // list 2-9
// const http = require('http');
// const fs = require('fs');

// var server = http.createServer(getFromClient);

// server.listen(3000);
// console.log('server start!');

// // ここまでメインプログラム ==================

// // CreateServerの処理
// function getFromClient(request, response) {
//     fs.readFile('./index.html', 'UTF-8',
//         (error, data) => {
//             var content = data
//             .replace(/dummy_title/g, 'This is Title')
//             .replace(/dummy_content/g, 'This is Content');

//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(content);
//             response.end()
//         }
//     );
// }




// list 2-11
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./index.ejs', 'utf8')

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('server start!');

// ここまでメインプログラム ==================

// CreateServerの処理
function getFromClient(request, response) {
    var content = ejs.render(index_page);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end()
}
