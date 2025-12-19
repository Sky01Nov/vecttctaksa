const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const knex = require('knex');
const knexConfig = require('./knexfile');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

// Initialize App
const app = express();
const db = knex(knexConfig.development); // เชื่อมต่อ DB vecskill

// Middlewares
app.use(cors());          // อนุญาตให้ Frontend เรียก API ได้
app.use(express.json());  // อ่าน JSON Body ได้
app.use(morgan('dev'));   // แสดง Log การเรียก API

// Inject DB to Request (เพื่อให้ Route เรียกใช้ db ได้สะดวก)
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Swagger Configuration (Document)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'VEC Skill Evaluation API',
            version: '1.0.0',
            description: 'API ระบบประเมินสมรรถนะ (Database: vecskill)',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 7000}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'], // บอก Swagger ว่า Route อยู่ที่ไหน
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check Route
app.get('/health', async (req, res) => {
    try {
        const result = await db.raw('SELECT 1+1 AS result');
        res.json({ 
            status: 'ok', 
            database: 'connected', 
            db_name: process.env.DB_NAME,
            test: result[0][0].result 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
// const masterRoutes = require('./routes/masters');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/masters', masterRoutes);

// Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; // เผื่อใช้ทำ Test