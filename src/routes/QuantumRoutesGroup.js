import { Router } from "express";
import { QuantumControllersGroup } from "../routesControllers/QuantumControllersGroup.js";
import { limiterUser, limiterIP } from "../middlewares/rate-limit.js";
import { GroupUpload } from "../middlewares/file-upload-group.js";

const router = Router();

// GRUPO UNO
router.post('/firstgroup', GroupUpload.single('groupOne'), QuantumControllersGroup.PostToFirstGroup);
router.get('/getfirstgroup', QuantumControllersGroup.GetFirstGroupFiles);
router.post('/secondgroup', QuantumControllersGroup.PostToSecondGroup);

// GRUPO DOS

// REGRESO A GRUPO DOS

// ENTREGA DEL GRUPO DOS


export default router;