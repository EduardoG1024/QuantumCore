import { Router } from "express";
import { limiter } from "../middlewares/rate-limit";
import { upload } from "../middlewares/file-upload";
import router from "./QuantumRoutes";
import { QuantumControllersGroup } from "../routesControllers/QuantumControllersGroup";

const router = Router();

// GRUPO UNO
router.post('/firstgroup', QuantumControllersGroup.PostToFirstGroup);
router.get('/getfirstgroup', QuantumControllersGroup.GetFirstGroupFiles);
router.post('/secondgroup', QuantumControllersGroup.PostToSecondGroup);

// GRUPO DOS

// REGRESO A GRUPO DOS

// ENTREGA DEL GRUPO DOS


export default router;