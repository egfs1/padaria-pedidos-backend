import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router()

const orderController = new OrderController()

router.get('/', orderController.index)
router.post('/save', orderController.create)
router.delete('/delete', orderController.delete)
router.put('/update', orderController.edit)

export default router