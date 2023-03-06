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
router.get('/', userController.index)
router.get('/:id', userController.findById)
router.post('/save', userController.create)
router.delete('/delete/:id', userController.delete)
router.put('/update/:id', userController.update)

export default router