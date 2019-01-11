const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
const articles = require('./controllers/articles')(app);
mongoose.connect('mongodb://localhost/zwaste');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))



app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;
