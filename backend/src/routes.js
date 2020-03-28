const express = require('express');
const routes = express.Router();
const sessionRoutes = require('./routes/sessionRoute')
const profileRoutes = require('./routes/profileRoute')
const incidentsRoutes = require('./routes/incidentsRoute')
const ongsRoutes = require('./routes/ongsRoute')

routes.use(sessionRoutes)
routes.use(profileRoutes)
routes.use(incidentsRoutes)
routes.use(ongsRoutes)

module.exports = routes