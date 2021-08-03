const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session');

const app = express()
const sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen('3000', () => {
    console.log('Application started at 3000')
})

