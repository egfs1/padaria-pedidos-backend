import { Router } from "express";
import productRouter from './product.routes'
import companyRouter from './company.routes'
import priceRouter from './price.routes'
import orderRouter from './order.routes'
import userRouter from './user.routes'
import authRouter from './auth.routes'

import { ensureIsAuthenticated } from "../middlewares/ensureIsAuthenticated";

const router = Router()

router.use('/', authRouter)
router.use('/products',ensureIsAuthenticated, productRouter)
router.use('/companies', ensureIsAuthenticated, companyRouter)
router.use('/prices', ensureIsAuthenticated, priceRouter)
router.use('/orders', ensureIsAuthenticated, orderRouter)
router.use('/users', ensureIsAuthenticated, userRouter)

export default router