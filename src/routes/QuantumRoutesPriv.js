import { Router } from "express";
import { limiter } from "../middlewares/rate-limit";
import { upload } from "../middlewares/file-upload";
import router from "./QuantumRoutes";

const router = Router();

// GRUPO CARPETAS
router.get('/nombres');   


export default router;