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

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     session.cookie.secure = true // serve secure cookies
// }

app.use(session(sess))

app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url path name
    var pathname = parseurl(req).pathname

    // count the view
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

app.get('/', (req, res) => {
    res.send('You viewed this page ' + req.session.views['/'] + ' times')
})

app.listen('3000', () => {
    console.log('Application started at 3000')
})

