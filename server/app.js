const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
global.conn = require('./bin/db');
const cors = require('cors');
jwt = require('jsonwebtoken'); // Import jsonwebtoken


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const customRouter = require('./routes/custom');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
secretKey = 'abhi-vegi';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
}, (jwtPayload, done) => {
  console.log(jwtPayload, 'jwtPayload');
  return done(null, jwtPayload);
}));


app.use('/app',  function(req, res, next) {
  res.render('index', { title: 'Application is running...' });
});
// passport.authenticate('jwt', { session: false }),
app.use('/api/users', usersRouter);
app.use('/api/records', recordsRouter);
app.use('/api/cust', customRouter);
app.use('/api', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
