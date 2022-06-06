import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";

import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router()

const companyController = new CompanyController()

router.get('/', companyController.index)
router.get('/:id', companyController.findById)

router.use(ensureIsAdmin)

// Only Admin routes
router.post('/save', companyController.create)
router.delete('/delete/:id', companyController.delete)
router.put('/update/:id', companyController.update)

export default router