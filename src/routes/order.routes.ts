import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router()

const orderController = new OrderController()

router.get('/', orderController.index)
router.post('/exists', orderController.exists)
router.get('/:id', orderController.findById)
router.get('/company/:company_id', orderController.findByCompany)
router.get('/quantitative/:company_id/:month', orderController.quantitative)
router.post('/save', orderController.create)
router.delete('/delete/:id', orderController.delete)
router.put('/update/:id', orderController.update)

export default router