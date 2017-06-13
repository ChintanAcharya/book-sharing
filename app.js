const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

// routes
// TODO: Add additional routes
const index = require('./routes/index'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    register = require('./routes/register'),
    post = require('./routes/post'),
    request = require('./routes/request'),
    viewRequests = require('./routes/viewRequests'),
    viewPosts = require('./routes/viewPosts');

//middleware
const auth = require('./middleware/auth');

// main app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//session secret
const sessionSecret = require('./config').sessionSecret;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: sessionSecret}));

// route config
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/post', auth, post);
app.use('/request', auth, request);
app.use('/viewRequests', auth, viewRequests);
app.use('/viewPosts', auth, viewPosts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;