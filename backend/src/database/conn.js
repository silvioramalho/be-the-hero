const knex = require('knex');
const configuration = require('../../knexfile'); // de acordo com o diretorio onde está o arquivo

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;
