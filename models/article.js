const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
  name: String,
  description: String,
  bin: String
});

module.exports = Article;
