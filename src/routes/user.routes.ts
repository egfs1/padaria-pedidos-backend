import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router()

const userController = new UserController()

router.use(ensureIsAdmin)

// Only Admin routes
router.post('/save', userController.create)

export default router