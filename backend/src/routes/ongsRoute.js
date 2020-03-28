const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const controller = require('../controllers/ongsController');

routes.get('/ongs', controller.list);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), controller.create);
routes.get('/ongs/:id', controller.index);
routes.put('/ongs/:id', controller.update);
routes.delete('/ongs/:id', controller.delete);

module.exports = routes