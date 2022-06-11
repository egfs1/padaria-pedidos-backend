import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { ensureIsAuthenticated } from "../middlewares/ensureIsAuthenticated";

const router = Router()

const userController = new UserController()

router.get('/exists-admin', userController.existsAdmin)
router.post('/create-admin', userController.createIfHaveNotAdmin)

router.use(ensureIsAuthenticated)
router.use(ensureIsAdmin)

// Only Admin routes
router.post('/save', userController.create)

export default router