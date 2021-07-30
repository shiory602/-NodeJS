const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.setHeader('Set-Cookie', 'last_access=value;');
    res.cookie('test', 'hello');
    var cookie = req.test;
    res.json(cookie);
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is on ' + port);
});
