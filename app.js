const express = require('express')
const app = express()


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zwaste');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const Article = mongoose.model('Article', {
  name: String,
  description: String,
  bin: String
});

var exphbs = require('express-handlebars');

// OUR MOCK ARRAY OF PROJECTS
// let articles = [
//   { name: "batman forever", description: "This is clearly trash", bin:"trash" },
//   { name: "ATitanic", description: "This is deffinetly recycleing" , bin:"compost" }
// ]


app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routeing
// INDEX Page for later devlopment
// app.get('/articles', (req, res) => {
//   res.render('articles-index', { articles: articles });
// })

// INDEX
app.get('/', (req, res) => {
  Article.find()
    .then(articles => {
      res.render('articles-index', { articles: articles });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/articles/new', (req, res) => {
  res.render('articles-new', {});
})


// CREATE
app.post('/articles', (req, res) => {
  Article.create(req.body).then((article) => {
    console.log(article);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
