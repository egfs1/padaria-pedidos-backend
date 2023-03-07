import { Router } from "express";
import { LogsController } from "../controllers/LogsController";
import { ensureIsAuthenticated } from "../middlewares/ensureIsAuthenticated";

const router = Router()

const logsController = new LogsController()

router.use(ensureIsAuthenticated)

router.post('/save', logsController.create)

export default router