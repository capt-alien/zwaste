const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

// OUR MOCK ARRAY OF PROJECTS
let articles = [
  { name: "batman forever", description: "This is clearly trash", bin:"trash" },
  { name: "ATitanic", description: "This is deffinetly recycleing" , bin:"compost" }
]


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routeing
app.get('/', (req, res) => {
  res.render('articles-index', { articles: articles });
})

// INDEX
app.get('/articles', (req, res) => {
  res.render('articles-index', { articles: articles });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
