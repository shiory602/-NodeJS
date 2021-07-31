const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('test', 'hello', { maxAge: 3600 }); //
    var cookie = req.test;
    res.json(cookie);
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is on ' + port);
});
