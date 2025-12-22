const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const db = require('./src/db'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.db = db;
    next();
});

const getRouteFiles = () => {
    const routesDir = path.join(__dirname, 'src', 'routes');

    if (!fs.existsSync(routesDir)) return [];

    return fs.readdirSync(routesDir)
        .filter(file => file.endsWith('.js'))
        .map(file => path.join(routesDir, file));
};


// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'VEC Skill Evaluation API',
//             version: '1.0.0',
//             description: 'API ระบบประเมินสมรรถนะ (Database: vecskill)',
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT || 7000}`,
//             },
//         ],
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                     bearerFormat: 'JWT',
//                 },
//             },
//         },
//         security: [{ bearerAuth: [] }],
//     },
//     apis: ['./src/routes/*.js'],
// };

// const swaggerOptions = {
//     openapi: '3.0.0',
//     info: {
//         ti
//     }
// }

const swaggerDocs = swaggerJsDoc({

    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ระบบประเมินบุคลากร',
            description: 'Api ประเมินบุคลากร',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
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
        security: [{ bearerAuth: []}],
    },
    apis: getRouteFiles()

});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check Route
app.get('/health', async (req, res) => {
    try {
        const result = await db.raw('SELECT 1+1 AS result');
        res.json({ 
            status: 'ok', 
            database: 'connected', 
            db_name: process.env.DB_NAME,
            test_result: result[0][0].result 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});




// Import Routes
// const authRoutes = require('./src/routes/auth');
// const userRoutes = require('./src/routes/user');
// const masterRoutes = require('./src/routes/main');

// Use Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/main', console.log('Hello, world'));



// 6. Global Error Handler (สำคัญมาก! ต้องอยู่ล่างสุด)
// ดักจับ Error ที่เกิดจาก Route ทั้งหมด รวมถึง 404 Not Found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    // Log error ลง console (หรือส่งเข้า Sentry/Log system)
    console.error('🔥 Error:', error.message);

    // กำหนด Status Code (ถ้าไม่มีมาให้ใช้ 500)
    res.status(error.status || 500);

    // ส่ง JSON ตอบกลับ
    res.json({
        error: {
            message: error.message,
            // ส่ง Stack Trace เฉพาะตอน Dev เพื่อความปลอดภัย
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        }
    });
});


// จุดสร้าง server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;