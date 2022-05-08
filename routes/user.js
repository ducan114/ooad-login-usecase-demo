const { Router } = require('express');
const User = require('../models/user');
const { authenticate } = require('../middlewares');

const router = new Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const { _id, password, ...restOfUser } = user._doc;
    res.json({ user: restOfUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
