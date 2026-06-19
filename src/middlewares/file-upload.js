import fs from 'fs';
import { Uuid } from '../config/uuid.adapter.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const user = 'Pap';
        const dirPath = `uploads/${user}`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        const uuid = Uuid()
        cb(null, 'Peali-' + uuid + '.png');
    }
})
export const upload = multer({storage: storage});