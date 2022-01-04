const Router = require('express');
const router = new Router();
const userRouter = require('./usersRouter');
const profileRouter = require('./profiles.Router');

router.use('/users', userRouter);
router.use('/profiles', profileRouter);

module.exports = router;
