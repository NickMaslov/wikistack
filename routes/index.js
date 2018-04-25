const router = require('express').Router();
module.exports = router;

const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

