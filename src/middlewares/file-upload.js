import fs from 'fs';
import { Uuid } from '../config/uuid.adapter.js';
import multer from "multer";

const allowedTypes = ['png', 'jpg', 'jpeg', 'zip', 'txt'];

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
        const ext = file.mimetype.replace('image/', '');
        cb(null, 'Quantum-' + uuid + '.' + ext);
    }
})
export const upload = multer({storage: storage});