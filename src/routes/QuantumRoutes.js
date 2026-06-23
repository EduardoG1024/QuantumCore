import { Router } from "express";
import { QuantumControllers } from "../routesControllers/QuantumControllers.js";
import { limiterUser, limiterIP } from "../middlewares/rate-limit.js";
import { upload } from "../middlewares/file-upload.js";

const router = Router();

router.post('/register', limiterIP, QuantumControllers.RegisterUser);
router.post('/login', limiterIP, QuantumControllers.LoginUser);                                             
router.get('/download/:doc', QuantumControllers.DownloadDocument);                               
router.get('/docs', QuantumControllers.GenerateDocuments);                                            
router.post('/upload', limiterUser, upload.single('fileRequest'), QuantumControllers.UploadFile);              
router.get('/uploads/:folder', QuantumControllers.GetUploads);                                  
router.delete('/delete/:dirname', QuantumControllers.DeleteFolder);
router.get('/error', QuantumControllers.ErrorDirect);
router.get('/registerkey', QuantumControllers.RegisterKey);

export default router;