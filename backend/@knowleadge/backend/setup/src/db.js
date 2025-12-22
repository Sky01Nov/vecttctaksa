const knex = require('knex');
const knexConfig = require('../knexfile');

// เลือก Environment (ถ้าไม่มีค่า ENV ให้ใช้ 'development' เป็น default)
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

// สร้าง Connection Instance
const db = knex(config);

// Export ออกไปให้ไฟล์อื่นใช้
module.exports = db;