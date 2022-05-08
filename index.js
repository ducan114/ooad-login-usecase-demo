if (process.env.NODE_ENV != 'production') require('dotenv').config();

const express = require('express');
const { connect } = require('mongoose');
const cors = requrie('cors');
const cookieParser = require('cookie-parser');
const { logErrors, clientErrorHandler } = require('./middlewares');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const { PORT = 5000, MONGODB_STRING_URI } = process.env;
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use(logErrors);
app.use(clientErrorHandler);

connect(MONGODB_STRING_URI, () =>
  app.listen(PORT, () => console.log(`Server is litening on port ${PORT}`))
);
