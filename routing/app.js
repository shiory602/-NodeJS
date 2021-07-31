var express = require('express');
var app = express();

// app.use('/shiori', express.static('public')); // publicディレクトリに入っているファイルをロード
app.use('/static', express.static(__dirname + '/public')); // 絶対パス（こっちの方が安全 -> /static/css/style.css

app.get('/', (req, res) => {
    res.send('Hello world.');
});

app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.put('/user', (req, res) => {
    res.send('Got PUT request at /user');
});

app.delete('/user', (req, res)=> {
    res.send('Got a DELETE request at /user');
});


app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3000, ()=> {
    console.log('Server is on 3000');
})