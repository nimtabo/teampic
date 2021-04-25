const knex = require('knex');
const knexfile = require('../knexfile');
const environment = process.env.DB_ENV || 'development';


const client = knex(knexfile[environment]);

module.exports = client;