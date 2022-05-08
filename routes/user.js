const { Router } = require('express');
const User = require('../models/user');
const { authenticate } = require('../middlewares');

const router = new Router();

router.get('/', authenticate, (req, res, next) => {
  try {
    const user = User.findOne({ username: req.user.usernames });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
