import { Router } from "express";
import { limiter } from "../middlewares/rate-limit";
import { upload } from "../middlewares/file-upload";
import router from "./QuantumRoutes";
import { QuantumControllersGroup } from "../routesControllers/QuantumControllersGroup";

const router = Router();

// GRUPO CARPETAS
router.post('/assign', QuantumControllersGroup.Assign);
router.post('/firstgroup', QuantumControllersGroup.PostToFirstGroup)   


export default router;