import 'dotenv/config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import { envs } from './config/envs.js';
import { Uuid } from './config/uuid.adapter.js';
import QuantumRoutes from './routes/QuantumRoutes.js';

const app = express();
app.use(helmet());

app.set('trust proxy', 1);
app.use(
    session({
        secret: envs.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
        },
    })
);

export const __dirname = import.meta.dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/quantum', QuantumRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.use((err, req, res, next) => {
    console.log(err);
    
    return res.status(500).json({
        QuantumCore: 'ERROR',
        message: 'Ocurrió un Error en el Servidor Regresa al Inicio...',
        report: 'El Error Fue Reportado',
        date: new Date(),
    })
});

app.listen(envs.PORT, () => {
    console.log(`Servidor Escuchando en el Puerto: ${envs.PORT}`);
    console.log(`http://localhost:${envs.PORT}`);
});