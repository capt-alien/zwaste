//articles.js
const Article = require('../models/article');

module.exports = function(app) {

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
    console.log(article)
    res.redirect(`/articles/${article._id}`) // Redirect to articles/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// EDIT
app.get('/articles/:id/edit', (req, res) => {
  Article.findById(req.params.id, function(err, article) {
    res.render('articles-edit', {article: article});
  })
})

// SHOW
app.get('/articles/:id', (req, res) => {
  Article.findById(req.params.id).then((article) => {
    res.render('articles-show', { article: article })
  }).catch((err) => {
    console.log(err.message);
  })
})

// UPDATE
app.put('/articles/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(article => {
      res.redirect(`/articles/${article._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/articles/:id', function (req, res) {
  console.log("DELETE article")
  Article.findByIdAndRemove(req.params.id).then((article) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

}
