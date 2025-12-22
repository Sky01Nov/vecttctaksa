const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = req.db;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        const user = await db('usrmst').where({ usreml: email }).first();
        if (!user) {
            return res.status(401).json({ success: false, message: 'ไม่พบผู้ใช้หรือรหัสผ่านผิด' });
        }

        const isMatch = await bcrypt.compare(password, user.usrpwd);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'รหัสผ่านผิด' });
        }

        const token = jwt.sign(
            { id: user.usrseq, role: user.usrrol, name: user.usrnam },
            process.env.JWT_SECRET || 'secret_key_for_competition',
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'เข้าสู่ระบบสำเร็จ',
            token,
            user: { id: user.usrseq, name: user.usrnam, role: user.usrrol }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.get('/hello', verifyToken, (req, res) => {
    const user = req.user;

    res.json({
        success: true,
        message: `สวัสดีคุณ ${user.name}! Token ของคุณถูกต้อง`,
        your_role: user.role
    });
});

module.exports = router;