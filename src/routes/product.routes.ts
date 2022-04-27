import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router()

const productController = new ProductController()

router.get('/', productController.index)
router.post('/save', productController.create)
router.delete('/delete', productController.delete)
router.put('/edit/:id', productController.edit)

export default router