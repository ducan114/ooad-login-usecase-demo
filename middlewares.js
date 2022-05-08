const jwt = require('jsonwebtoken');

const { JWT_ACCESS_TOKEN_SECRET } = process.env;

function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  res.status(500).json({ message: 'An internal error occurred' });
}

function authenticate(req, res, next) {
  const authHeader = req.header('authorization');
  const accessToken = authHeader && authHeader.split(' ')[1];
  if (!accessToken) return res.status(401).json({ message: 'Unauthenticated' });
  jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthenticated' });
    console.log(decoded);
    req.user = decoded;
    next();
  });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  authenticate,
};
