const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const controller = require('../controllers/incidentsController');

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), controller.list);

routes.post('/incidents', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), controller.create);

routes.get('/incidents/:id', controller.index);
routes.put('/incidents/:id', controller.update);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), controller.delete);

module.exports = routes