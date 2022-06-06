import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router()

const productController = new ProductController()

router.get('/', productController.index)
router.get('/:id', productController.findById)

router.use(ensureIsAdmin)

// Only Admin routes
router.post('/save', productController.create)
router.delete('/delete/:id', productController.delete)
router.put('/update/:id', productController.update)

export default router