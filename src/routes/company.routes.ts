import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";

const router = Router()

const companyController = new CompanyController()

router.get('/', companyController.index)
router.post('/save', companyController.create)
router.delete('/delete/:id', companyController.delete)
router.put('/update/:id', companyController.update)

export default router