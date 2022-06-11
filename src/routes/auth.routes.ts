import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router()

const authController = new AuthController()

router.post('/auth', authController.auth)
router.post('/me', authController.me)

export default router