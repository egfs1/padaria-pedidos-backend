import { Router } from "express";
import productRouter from './product.routes'
import companyRouter from './company.routes'
import priceRouter from './price.routes'
import orderRouter from './order.routes'

const router = Router()

router.use('/products', productRouter)
router.use('/companies', companyRouter)
router.use('/prices', priceRouter)
router.use('/orders', orderRouter)

export default router