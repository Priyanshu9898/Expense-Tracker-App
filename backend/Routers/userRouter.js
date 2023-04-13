import express from 'express';
import { loginControllers, registerControllers } from '../controllers/userController';

const router = express.Router();

router.route("/register").post(registerControllers);


router.route("/login").post(loginControllers);

export default router;