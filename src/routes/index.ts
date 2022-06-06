import { Router } from "express";
import productRouter from './product.routes'
import companyRouter from './company.routes'
import priceRouter from './price.routes'
import orderRouter from './order.routes'
import userRouter from './user.routes'
import authRouter from './auth.routes'

import { ensureIsAuthenticated } from "../middlewares/ensureIsAuthenticated";

const router = Router()

// Authenticate route
router.use('/', authRouter)

router.use(ensureIsAuthenticated)

// User routes
router.use('/orders', orderRouter)
router.use('/products', productRouter)
router.use('/companies', companyRouter)
router.use('/prices', priceRouter)
router.use('/users', userRouter)

export default router