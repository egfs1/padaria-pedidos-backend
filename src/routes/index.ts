import { Router } from "express";
import productRouter from './product.routes'
import companyController from './company.routes'

const router = Router()

router.use('/products', productRouter)
router.use('/companies', companyController)

export default router