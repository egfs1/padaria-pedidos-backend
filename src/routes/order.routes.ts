import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router()

const orderController = new OrderController()

router.post('/save', orderController.create)

export default router