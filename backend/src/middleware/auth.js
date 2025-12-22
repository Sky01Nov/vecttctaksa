const jwt = require('jsonwebtoken');

/**
 * Middleware สำหรับตรวจสอบ JWT Token
 * ใช้แปะหน้า Route ที่ต้องการความปลอดภัย (Private Routes)
 * ตามเกณฑ์ข้อ 3.2.6.10 (API มีความปลอดภัย และมีระบบตรวจสอบสิทธิ์)
 */
const Token = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    
    if (typeof bearerHeader === 'undefined') {
        return res.status(403).json({
            success: false,
            message: 'ไม่พบ Token'
        });
    }

    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'รูปแบบ Token ไม่ถูกต้อง'
            });
        }
        const secretKey = process.env.JWT_SECRET || 'secret_key_for_competition';
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token ไม่ถูกต้องหรือหมดอายุ'
        });
    }
};

/**
 * Middleware สำหรับตรวจสอบ Role (เช่น เฉพาะ Admin เท่านั้น)
  @param {string[]} roles - รายชื่อ Role ที่อนุญาตให้เข้าถึง เช่น ['admin', 'evaluator']
 */
const auth = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: สิทธิ์ของคุณ (${req.user.role}) ไม่สามารถเข้าถึงส่วนนี้ได้`
            });
        }

        next();
    };
};

module.exports = {
    Token,
    auth
};