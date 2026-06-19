import fs from 'fs';
import { Uuid } from '../config/uuid.adapter.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const user = 'Quantum';
        const dirPath = `uploads/${user}`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        const uuid = Uuid()
        cb(null, 'Quantum-' + uuid + file.mimetype);
    }
})
export const upload = multer({storage: storage});