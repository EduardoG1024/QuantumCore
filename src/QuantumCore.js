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

app.use(
    session({
        secret: envs.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}, // CAMBIAR EN PRODUCCION
    })
);

const __dirname = import.meta.dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/rita', QuantumRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(envs.PORT, () => {
    console.log(`Servidor Escuchando en el Puerto: ${envs.PORT}`);
    console.log(`http://localhost:${envs.PORT}`);
});