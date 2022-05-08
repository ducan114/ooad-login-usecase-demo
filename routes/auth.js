const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;
const router = Router();

router.post('/signin', async (req, res, next) => {
  // Validate inputs.
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'username and password are required' });
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ message: 'Login failed. Please check your credentials' });
    const refreshToken = jwt.sign(
      {
        username
      },
      JWT_REFRESH_TOKEN_SECRET
    );
    res.cookie('refreshToken', refreshToken, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
      secure: true
    });
  } catch (err) {
    next(err);
  }
});

router.get('/token', (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ message: 'Unauthenticated' });
  jwt.decode(refreshToken, JWT_REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthenticated' });
    try {
      const user = User.findOne({ username: decoded.username });
      if (!user)
        return res.status(404).json({ message: 'User is no longer exists' });
      const accessToken = jwt.sign(
        { username: user.username, admin: user.admin },
        JWT_ACCESS_TOKEN_SECRET
      );
      res.json({ message: 'Token generated', token: accessToken });
    } catch (err) {
      next(err);
    }
  });
});

module.exports = router;
