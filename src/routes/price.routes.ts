import { Router } from "express";
import { PriceController } from "../controllers/PriceController";

const router = Router()

const priceController = new PriceController()

router.get('/', priceController.index)
router.post('/save', priceController.create)
router.delete('/delete', priceController.delete)
router.put('/update/:id', priceController.update)

export default router