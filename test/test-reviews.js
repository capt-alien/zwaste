// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Article = require('../models/article');
const sampleArticle =     {
    "name": "Holmes and Watson",
    "description": "A gient douche",
    "bin": "Trash"
}


chai.use(chaiHttp);

describe('articles', ()  => {

  // TEST INDEX
  it('should index ALL articles on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /articles/new GET', (done) => {
    chai.request(server)
      .get(`/articles/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });


  // TEST CREATE
  it('should create a SINGLE article on /articles POST', (done) => {
    chai.request(server)
        .post('/articles')
        .send(sampleArticle)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

    // TEST SHOW
    it('should show a SINGLE article on /articles/<id> GET', (done) => {
      var article = new Article(sampleArticle);
      article.save((err, data) => {
        chai.request(server)
          .get(`/articles/${data._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
      });
    });


    // TEST EDIT
    it('should edit a SINGLE article on /articles/<id>/edit GET', (done) => {
    var article = new Article(sampleArticle);
     article.save((err, data) => {
       chai.request(server)
         .get(`/articles/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
    });

    // TEST UPDATE
    it('should update a SINGLE article on /articles/<id> PUT', (done) => {
      var article = new Article(sampleArticle);
      article.save((err, data)  => {
       chai.request(server)
        .put(`/articles/${data._id}?_method=PUT`)
        .send({'title': 'Updating the title'})
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
      });
    });


    // TEST DELETE
    it('should delete a SINGLE article on /articles/<id> DELETE', (done) => {
      var article = new Article(sampleArticle);
      article.save((err, data)  => {
       chai.request(server)
        .delete(`/articles/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
      });
    });
  });

});
