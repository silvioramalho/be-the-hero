const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const controller = require('../controllers/profileController');

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),controller.list);

module.exports = routes