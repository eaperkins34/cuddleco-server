require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');
/******CONTROLLERS******/
var user = require('./controllers/user-controller');
var login = require('./controllers/login-controller');
var animal = require('./controllers/animal-controller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require ('./middleware/headers'));

app.use('/signup', user);
app.use('/login', login);

app.use('/animal', animal)


app.listen(process.env.PORT, () => {
    console.log(`App is listening on secret port ${process.env.PORT}`)
})