const express = require('express');
const routes = require('./src/routes.root');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MESSAGES = require('./src/v1/utils/constants');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', routes);

app.use((err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json({ ...output.payload, success: false });
  } else {
    return res.status(500).json({ success: false, statusCode: 500, error: MESSAGES.ERROR.SERVER_ISSUE, message: err.sqlMessage || err.message });
  }
});


module.exports = app;