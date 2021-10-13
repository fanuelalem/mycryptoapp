const express = require("express")
    , dotenv = require("dotenv")
    , database = require('../config/database')
    , url = require("url")
    , swagger = require("swagger-node-express")
    , cors = require('cors')
    , authRouter = require('./auth')
    , coreRouter = require('./core')
    , passport = require('passport');

dotenv.config();
database.connect();
const app = express();
const { ALLOWED_HEADERS, ALLOWED_ORIGIN } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${ALLOWED_ORIGIN}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', `${ALLOWED_HEADERS}`);
    next();
});
app.use('/api/auth', authRouter);
app.use('/api/core', coreRouter);

swagger.setAppHandler(app);

module.exports = app;