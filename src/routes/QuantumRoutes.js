import { Router } from "express";
import { QuantumControllers } from "../routesControllers/QuantumControllers.js";
import { limiter } from "../middlewares/rate-limit.js";
import { upload } from "../middlewares/file-upload.js";

const router = Router();

// RUTA DE TESTS NO PRODUCCION!!!
router.get('/testRoute', (req, res) => {
    return res.status(200).json({
        message: 'Test Route',
        data: 10,
    });
})

router.post('/register', QuantumControllers.registerUser);
router.post('/login', QuantumControllers.loginUser);                                             
router.get('/download/:doc', QuantumControllers.DownloadDocument);                               
router.get('/docs', QuantumControllers.GenerateDocuments);                                            
router.post('/upload', upload.single('fileRequest'), QuantumControllers.UploadFile);              
router.post('/uploads', QuantumControllers.UploadFile);                                  
router.delete('/delete/:DirName', QuantumControllers.DeleteFolder);                        

export default router;