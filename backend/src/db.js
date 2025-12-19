const knex = require('knex');
const knexFile = require('../knexfile');

// เลือก Config ของ development
const db = knex(knexFile.development);

module.exports = db;