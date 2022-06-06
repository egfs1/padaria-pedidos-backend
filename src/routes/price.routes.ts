import { Router } from "express";
import { PriceController } from "../controllers/PriceController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router()

const priceController = new PriceController()

router.get('/', priceController.index)
router.get('/:id', priceController.findById)
router.get('/company/:company_id', priceController.findByCompany)

router.use(ensureIsAdmin)

// Only Admin routes
router.post('/save', priceController.create)
router.delete('/delete/:id', priceController.delete)
router.put('/update/:id', priceController.update)

export default router