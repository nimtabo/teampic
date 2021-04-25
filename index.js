const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  }
}))

app.use(cookieParser());
app.use(logger('dev'));

const cohortRouter = require('./routes/cohorts')
app.use('/cohorts',cohortRouter)
const rootRouter = require('./routes/root')
app.use('/',rootRouter)

const knex = require('./db/client');

// const ADDRESS = 'localhost'; 
// const PORT = 3000;
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port,host, () => {
  console.log(`Server listening on ......`);
});
