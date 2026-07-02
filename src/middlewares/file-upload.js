import fs from 'fs';
import { Uuid } from '../config/uuid.adapter.js';
import multer from "multer";
import { error } from 'console';
import path from 'path';

const allowedTypes = ['png', 'jpg', 'jpeg', 'zip', 'txt', 'pdf', 'docx'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const user = req.session?.user?.user || false;
        if (!user) return cb(new Error('NO AUTORIZADO'), null);

        const dirPath = `uploads/${user}`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        const uuid = Uuid()
        const ext = path.extname(file.originalname);
        cb(null, 'Quantum-' + uuid + ext);
    }
})
export const upload = multer({storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        
        if (!allowedTypes.includes(ext)) {
            cb(error, null);
        }
        cb(null, true);
    }
});