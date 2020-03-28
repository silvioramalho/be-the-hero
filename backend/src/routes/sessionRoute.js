const express = require('express');
const routes = express.Router();
const controller = require('../controllers/sessionController');

routes.post('/sessions', controller.create);

module.exports = routes