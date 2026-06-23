import multer from "multer";
import fs from 'fs';
import path from "path";
import { __dirname } from "../QuantumCore.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const Path = path.join(__dirname, 'groupOne');
        if (!fs.existsSync(Path))
            return cb(new Error('Algo salio mal'), null);

        cb(null, 'groupOne');
    },
    filename: (req, file, cb) => {

        cb(null, new Date() + file.originalname);
    }
});

export const GroupUpload = multer({storage: storage,
    //limits: {fileSize: 50 * 1024 * 1024}, 
    fileFilter: (req, file, cb) => {
        // const name = req.body.name || false;
        // if (!name || typeof(name) !== 'string') {
        //     return cb(null, false);
        // }
        cb(null, true);
    }
});