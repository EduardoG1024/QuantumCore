import { Router } from "express";
import { QuantumControllers } from "../routesControllers/QuantumControllers.js";
import { limiter } from "../middlewares/rate-limit.js";
import { upload } from "../middlewares/file-upload.js";

const router = Router();

router.post('/register', QuantumControllers.RegisterUser);
router.post('/login', QuantumControllers.LoginUser);                                             
router.get('/download/:doc', QuantumControllers.DownloadDocument);                               
router.get('/docs', QuantumControllers.GenerateDocuments);                                            
router.post('/upload', upload.single('fileRequest'), QuantumControllers.UploadFile);              
router.get('/uploads', QuantumControllers.GetUploads);                                  
router.delete('/delete/:DirName', QuantumControllers.DeleteFolder);
router.get('/error', QuantumControllers.ErrorDirect);

export default router;