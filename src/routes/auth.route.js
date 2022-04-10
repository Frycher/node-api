import express from 'express';
import verifyToken from '../middlewares/verifyToken.js'
import authConroller from '../controllers/auth.conroller.js';

const router = express.Router();

router.post('/auth/register', authConroller.register);
router.post('/auth/login', authConroller.login);
router.post('/auth/logout', authConroller.logout);
router.get('/auth/activate/:link', authConroller.activate);
router.get('/auth/refresh', authConroller.refresh);

router.get('/auth/users',verifyToken ,authConroller.getUsers);

export default router;
