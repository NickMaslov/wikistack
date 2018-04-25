const models = require('../models');
const Page = models.Page; 
const User = models.User; 
const router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next) {
    Page.findAll({
        attributes: ['title', 'urlTitle']
    })
    .then((pages) => {
        res.render('index', { pages : pages });
    })
    .catch(next)
  });


  
router.post('/', function(req, res, next) {
    console.log(req.body, req.originalUrl);

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
    date : new Date(),
    status : req.body.status
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.

  page.save()
  .then(function(savedPage){
      console.log(savedPage.route)
    res.redirect(savedPage.route); // route virtual FTW
  }).catch(next);
  });
  
router.get('/add', function(req, res, next) {
    console.log('GET to add');
    res.render('addpage');
});

// router.get('/:urlTitle', function (req, res, next) {
//     res.send('hit dynamic route at ' + req.params.urlTitle);
// });

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ 
      where: { 
        urlTitle: req.params.urlTitle 
      } 
    })
    .then(function(foundPage){
      res.render('wikipage', {title: foundPage.title, content: foundPage.content});
    })
    .catch(next);
  });