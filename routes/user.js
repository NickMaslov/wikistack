const router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next) {
    res.send('	get all users, do not change db');
  });

router.get('/:userID', function(req, res, next) {
    res.send('get user 123, do not change db');
  });
  
router.route('/')
.post(function(req, res, next) {
    res.send('create a user in the db');
})
.put(function(req, res, next) {
    res.send('UPDATE USER');
})
.delete(function(req, res, next) {
    res.send('DELETE USER');
});
